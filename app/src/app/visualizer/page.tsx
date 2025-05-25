"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { omniGarden, gardens, omniEcosystem, productsGarden, devToolsGarden, specificationsGarden } from "@/lib/schema/garden";

// Make garden data globally available for subgarden expansion
declare global {
  interface Window {
    gardenData?: Record<string, any>;
  }
}
import { GardenTypes } from "@/generated/garden.types";
import Header from "@/components/Header";
import GardenTabs from "@/components/GardenTabs";
import { parseAsString, useQueryState } from "nuqs";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const LOCAL_STORAGE_KEY = "garden-schema-editor-content";

/**
 * Garden visualizer.
 */
const Visualizer = () => {
  const [garden, setGarden] = useState<GardenTypes>(omniGarden);
  const [activeTab, setActiveTab] = useQueryState(
    "tab",
    parseAsString.withDefault("visualize")
  );
  const [gardenKey, setGardenKey] = useState<number>(0); // Add key to force re-render
  const [navigationHistory, setNavigationHistory] = useState<{garden: GardenTypes, timestamp: number}[]>([]);
  const [breadcrumbs, setBreadcrumbs] = useState<string[]>([]);

  // load garden from local storage on initial render
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const savedSchema = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (savedSchema) {
          const parsedGarden = JSON.parse(savedSchema);
          if (
            parsedGarden?.name &&
            parsedGarden?.version &&
            Array.isArray(parsedGarden?.categories)
          ) {
            setGarden(parsedGarden);
          }
        }
      } catch (err) {
        console.error("Error loading garden from localStorage:", err);
        // fallback to default garden
      }
    }
  }, []);

  // All available gardens
  const allGardens = useMemo(() => gardens as Record<string, GardenTypes>, []);
  
  // Make garden data globally available for the flow.ts expand functionality
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.gardenData = gardens;
    }
  }, []);
  
  // Use useCallback to memoize the handler
  const handleGardenSwitch = useCallback((selectedGarden: GardenTypes) => {
    console.log("Switching garden to:", selectedGarden.name);
    
    // Clear localStorage first to prevent conflicts
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    
    // Save current garden in navigation history
    setNavigationHistory(prev => [...prev, {garden, timestamp: Date.now()}]);
    
    // Update breadcrumbs based on garden hierarchy
    if (selectedGarden.parent_gardens && selectedGarden.parent_gardens.length > 0) {
      // This is a subgarden - include parent garden in breadcrumb path
      const parentName = selectedGarden.parent_gardens[0].name;
      if (!breadcrumbs.includes(parentName)) {
        // Parent isn't in breadcrumbs yet, add it first
        setBreadcrumbs([parentName, selectedGarden.name]);
      } else {
        // Parent already in breadcrumbs, replace everything after parent with this garden
        const parentIndex = breadcrumbs.indexOf(parentName);
        setBreadcrumbs([...breadcrumbs.slice(0, parentIndex + 1), selectedGarden.name]);
      }
    } else {
      // This is a root garden - start fresh
      setBreadcrumbs([selectedGarden.name]);
    }
    
    // Set new garden
    setGarden(selectedGarden);
    
    // Force a re-render of the garden visualization
    setGardenKey(prevKey => prevKey + 1);
    
    // Switch to visualize tab if not already there
    if (activeTab !== "visualize") {
      setActiveTab("visualize");
    }
  }, [activeTab, setActiveTab, garden, breadcrumbs]);
  
  // Handler for direct garden navigation from ReactFlow
  const handleNavigateToGarden = useCallback((gardenName: string) => {
    const targetGarden = allGardens[gardenName];
    if (targetGarden) {
      handleGardenSwitch(targetGarden);
      // Log navigation for debugging
      console.log(`Navigated to ${gardenName}`);
    } else {
      console.warn(`Garden not found: ${gardenName}`);
    }
  }, [allGardens, handleGardenSwitch]);
  
  // Handler for back navigation
  const handleNavigateBack = useCallback(() => {
    if (navigationHistory.length > 0) {
      const previousEntry = navigationHistory[navigationHistory.length - 1];
      const previousGarden = previousEntry.garden;
      setGarden(previousGarden);
      setNavigationHistory(prev => prev.slice(0, -1));
      
      // Update breadcrumbs to match the garden hierarchy
      if (breadcrumbs.includes(previousGarden.name)) {
        // If the previous garden is already in breadcrumbs, truncate to that point
        const index = breadcrumbs.indexOf(previousGarden.name);
        setBreadcrumbs(prev => prev.slice(0, index + 1));
      } else if (previousGarden.parent_gardens && previousGarden.parent_gardens.length > 0) {
        // If the previous garden has parents, add it to appropriate place
        const parentName = previousGarden.parent_gardens[0].name;
        if (breadcrumbs.includes(parentName)) {
          const parentIndex = breadcrumbs.indexOf(parentName);
          setBreadcrumbs([...breadcrumbs.slice(0, parentIndex + 1), previousGarden.name]);
        } else {
          // Default case - just use the garden's name
          setBreadcrumbs([previousGarden.name]);
        }
      } else {
        // Default for root gardens
        setBreadcrumbs([previousGarden.name]);
      }
      
      setGardenKey(prevKey => prevKey + 1);
    }
  }, [navigationHistory, breadcrumbs]);
  
  // Handler for breadcrumb navigation
  const handleBreadcrumbClick = useCallback((index: number) => {
    // Get the garden at the specified index
    if (index < breadcrumbs.length) {
      const gardenName = breadcrumbs[index];
      const targetGarden = allGardens[gardenName];
      
      if (targetGarden) {
        // Update garden
        setGarden(targetGarden);
        
        // Update navigation history
        setNavigationHistory(prev => prev.slice(0, index));
        
        // Keep breadcrumbs up to and including the clicked item
        setBreadcrumbs(prev => prev.slice(0, index + 1));
        
        // Force re-render
        setGardenKey(prevKey => prevKey + 1);
      }
    }
  }, [allGardens, breadcrumbs]);

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col gap-2 mb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            {navigationHistory.length > 0 && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleNavigateBack}
                className="mr-2"
              >
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back
              </Button>
            )}
            <h1 className="text-2xl font-bold">{garden.name}</h1>
          </div>
          <div className="text-sm text-muted-foreground">
            {garden.version && `v${garden.version}`}
          </div>
        </div>
        
        {/* Navigation Breadcrumbs */}
        {breadcrumbs.length > 0 && (
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse bg-muted/40 rounded-md px-3 py-1">
              {breadcrumbs.map((crumb, index) => (
                <li key={`${crumb}-${index}`} className="inline-flex items-center">
                  {index > 0 && (
                    <span className="mx-1 text-gray-400">→</span>
                  )}
                  <button
                    onClick={() => handleBreadcrumbClick(index)}
                    className={`inline-flex items-center text-sm font-medium hover:text-primary hover:underline transition-colors ${
                      index === breadcrumbs.length - 1 
                        ? 'text-primary font-semibold bg-primary/10 px-2 py-0.5 rounded' 
                        : 'text-muted-foreground'
                    }`}
                  >
                    {index === 0 && '🏠 '}
                    {index === breadcrumbs.length - 1 && '📍 '}
                    {crumb}
                  </button>
                </li>
              ))}
            </ol>
          </nav>
        )}
      </div>
      
      <div className="mb-6 flex flex-col gap-3">
        <div className="text-sm text-muted-foreground mb-1">Select a garden to view:</div>
        <div className="flex flex-wrap gap-2">
          <Button 
            variant={garden.name === omniEcosystem.name ? "default" : "outline"} 
            onClick={() => handleGardenSwitch(omniEcosystem)}
            size="sm"
            className={garden.name === omniEcosystem.name ? "border-2 border-primary" : ""}
          >
            🌱 Omni Ecosystem
          </Button>
          <Button 
            variant={garden.name === productsGarden.name ? "default" : "outline"} 
            onClick={() => handleGardenSwitch(productsGarden)}
            size="sm"
            className={garden.name === productsGarden.name ? "border-2 border-primary" : ""}
          >
            📦 Omni Products
          </Button>
          <Button 
            variant={garden.name === devToolsGarden.name ? "default" : "outline"} 
            onClick={() => handleGardenSwitch(devToolsGarden)}
            size="sm"
            className={garden.name === devToolsGarden.name ? "border-2 border-primary" : ""}
          >
            🛠️ Omni Dev Tools
          </Button>
          <Button 
            variant={garden.name === specificationsGarden.name ? "default" : "outline"} 
            onClick={() => handleGardenSwitch(specificationsGarden)}
            size="sm"
            className={garden.name === specificationsGarden.name ? "border-2 border-primary" : ""}
          >
            📋 Omni Specifications
          </Button>
        </div>
      </div>
      
      <GardenTabs
        key={gardenKey}
        garden={garden}
        onSchemaChange={setGarden}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onNavigateToGarden={handleNavigateToGarden}
      />
    </div>
  );
};

export default Visualizer;
