"use client";

import Editor from "@monaco-editor/react";
import { AlertCircle, Check, Copy, Download } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import type { GardenTypes } from "@/generated/garden.types";

interface SchemaEditorProps {
  onSchemaChange: (schema: GardenTypes) => void;
  garden?: GardenTypes;
}

const LOCAL_STORAGE_KEY = "garden-schema-editor-content";

const SchemaEditor = ({ onSchemaChange, garden }: SchemaEditorProps) => {
  const { resolvedTheme } = useTheme();
  const [editorTheme, setEditorTheme] = useState<string>("light");
  // Initialize schema text with current garden or stored value
  const [schemaText, setSchemaText] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  // Initialize with the current garden or saved data
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedSchema = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (savedSchema) {
        setSchemaText(savedSchema);
      } else if (garden) {
        setSchemaText(JSON.stringify(garden, null, 2));
      }
    }
  }, [garden]);

  // Save schema to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, schemaText);
  }, [schemaText]);

  // Update editor theme when system/site theme changes
  useEffect(() => {
    setEditorTheme(resolvedTheme === "dark" ? "vs-dark" : "light");
  }, [resolvedTheme]);

  // Update editor when the garden prop changes
  useEffect(() => {
    if (garden) {
      const currentGardenStr = JSON.stringify(garden, null, 2);
      // Check if there are unsaved changes before updating
      const savedSchema = localStorage.getItem(LOCAL_STORAGE_KEY);

      // If no saved schema or the saved schema matches exactly what we'd set,
      // update the editor with the new garden
      if (
        !savedSchema ||
        JSON.stringify(JSON.parse(savedSchema)) === JSON.stringify(garden)
      ) {
        setSchemaText(currentGardenStr);
      }
    }
  }, [garden]);

  // Note: handleSchemaChange is no longer needed as Monaco editor handles this directly

  const validateAndApply = () => {
    try {
      const parsedJson = JSON.parse(schemaText);
      // Instead of using parse directly, we'll do a simple validation
      // by checking required fields
      if (
        !parsedJson.name ||
        !parsedJson.version ||
        !Array.isArray(parsedJson.categories)
      ) {
        throw new Error(
          "Invalid schema: missing required fields (name, version, or categories)",
        );
      }

      setError(null);
      onSchemaChange(parsedJson as GardenTypes);
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    }
  };

  const resetToSample = () => {
    if (!garden) return;

    const sampleText = JSON.stringify(garden, null, 2);
    setSchemaText(sampleText);
    setError(null);
    onSchemaChange(garden);
    localStorage.setItem(LOCAL_STORAGE_KEY, sampleText);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(schemaText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadSchema = () => {
    const blob = new Blob([schemaText], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "garden-schema.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Garden Editor</CardTitle>
        <CardDescription>
          Edit the JSON schema for your Garden visualization
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="editor">
          <TabsList className="mb-4">
            <TabsTrigger value="editor">JSON Editor</TabsTrigger>
            <TabsTrigger value="help">Schema Help</TabsTrigger>
          </TabsList>

          <TabsContent value="editor" className="space-y-4">
            <div className="relative">
              <div className="h-[400px] overflow-hidden rounded-md border">
                <Editor
                  height="400px"
                  defaultLanguage="json"
                  value={schemaText}
                  theme={editorTheme}
                  onChange={(value) => {
                    if (value) setSchemaText(value);
                    setError(null);
                  }}
                  options={{
                    minimap: { enabled: false },
                    scrollBeyondLastLine: false,
                    fontSize: 14,
                    scrollbar: {
                      vertical: "auto",
                      horizontal: "auto",
                    },
                    automaticLayout: true,
                  }}
                />
              </div>
              <div className="absolute top-2 right-2 z-10">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={copyToClipboard}
                  title="Copy to clipboard"
                >
                  {copied ? <Check size={16} /> : <Copy size={16} />}
                </Button>
              </div>
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription className="max-h-32 overflow-auto font-mono text-xs">
                  {error}
                </AlertDescription>
              </Alert>
            )}
          </TabsContent>

          <TabsContent value="help">
            <div className="space-y-4">
              <h3 className="font-medium text-lg">Garden Schema Structure</h3>
              <p>The Garden schema is designed to visualize ecosystems:</p>

              <div className="space-y-2">
                <h4 className="font-medium">Required Fields:</h4>
                <ul className="list-disc space-y-1 pl-6">
                  <li>
                    <code className="rounded bg-muted px-1 text-sm">name</code>:
                    Name of your Garden
                  </li>
                  <li>
                    <code className="rounded bg-muted px-1 text-sm">
                      version
                    </code>
                    : Version of the schema
                  </li>
                  <li>
                    <code className="rounded bg-muted px-1 text-sm">
                      categories
                    </code>
                    : Array of categories
                  </li>
                </ul>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium">Optional Fields:</h4>
                <ul className="list-disc space-y-1 pl-6">
                  <li>
                    <code className="rounded bg-muted px-1 text-sm">
                      description
                    </code>
                    : Description of your Garden
                  </li>
                  <li>
                    <code className="rounded bg-muted px-1 text-sm">
                      maintainers
                    </code>
                    : Array of maintainer objects
                  </li>
                  <li>
                    <code className="rounded bg-muted px-1 text-sm">
                      created_at
                    </code>
                    : Creation timestamp
                  </li>
                  <li>
                    <code className="rounded bg-muted px-1 text-sm">
                      updated_at
                    </code>
                    : Last update timestamp
                  </li>
                  <li>
                    <code className="rounded bg-muted px-1 text-sm">theme</code>
                    : Visual theme settings
                  </li>
                  <li>
                    <code className="rounded bg-muted px-1 text-sm">
                      supergardens
                    </code>
                    : Array of garden reference objects that this garden belongs
                    to
                  </li>
                  <li>
                    <code className="rounded bg-muted px-1 text-sm">
                      subgardens
                    </code>
                    : Array of garden reference objects that belong to this
                    garden
                  </li>
                </ul>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium">Category Structure:</h4>
                <ul className="list-disc space-y-1 pl-6">
                  <li>
                    <code className="rounded bg-muted px-1 text-sm">name</code>:
                    Category name
                  </li>
                  <li>
                    <code className="rounded bg-muted px-1 text-sm">
                      description
                    </code>
                    : (Optional) Category description
                  </li>
                  <li>
                    <code className="rounded bg-muted px-1 text-sm">items</code>
                    : (Optional) Array of item objects
                  </li>
                  <li>
                    <code className="rounded bg-muted px-1 text-sm">
                      categories
                    </code>
                    : (Optional) Array of category objects (recursive)
                  </li>
                  <li>
                    <code className="rounded bg-muted px-1 text-sm">
                      garden_refs
                    </code>
                    : (Optional) Array of garden reference objects related to
                    this category
                  </li>
                </ul>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium">Recursive Structure:</h4>
                <p>
                  Categories can contain nested categories which are themselves
                  categories, allowing for infinite nesting. Each category can
                  contain both items and further categories.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium">Item Structure:</h4>
                <ul className="list-disc space-y-1 pl-6">
                  <li>
                    <code className="rounded bg-muted px-1 text-sm">name</code>:
                    Item name
                  </li>
                  <li>
                    <code className="rounded bg-muted px-1 text-sm">
                      homepage_url
                    </code>
                    : Website URL
                  </li>
                  <li>
                    <code className="rounded bg-muted px-1 text-sm">logo</code>:
                    Logo URL
                  </li>
                  <li>
                    <code className="rounded bg-muted px-1 text-sm">
                      repo_url
                    </code>
                    : (Optional) Repository URL
                  </li>
                  <li>
                    <code className="rounded bg-muted px-1 text-sm">
                      description
                    </code>
                    : (Optional) Item description
                  </li>
                  <li>
                    <code className="rounded bg-muted px-1 text-sm">
                      twitter
                    </code>
                    : (Optional) Twitter handle
                  </li>
                </ul>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium">Garden Reference Structure:</h4>
                <ul className="list-disc space-y-1 pl-6">
                  <li>
                    <code className="rounded bg-muted px-1 text-sm">name</code>:
                    Garden name
                  </li>
                  <li>
                    <code className="rounded bg-muted px-1 text-sm">url</code>:
                    URL to the referenced garden
                  </li>
                  <li>
                    <code className="rounded bg-muted px-1 text-sm">
                      description
                    </code>
                    : (Optional) Garden description
                  </li>
                  <li>
                    <code className="rounded bg-muted px-1 text-sm">logo</code>:
                    (Optional) Logo URL
                  </li>
                  <li>
                    <code className="rounded bg-muted px-1 text-sm">
                      version
                    </code>
                    : (Optional) Garden version
                  </li>
                </ul>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="space-x-2">
          <Button onClick={validateAndApply} variant="default">
            Apply Changes
          </Button>
          <Button onClick={resetToSample} variant="outline">
            Reset to Sample
          </Button>
        </div>
        <Button onClick={downloadSchema} variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Download Schema
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SchemaEditor;
