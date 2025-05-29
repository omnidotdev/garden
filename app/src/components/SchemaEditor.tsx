"use client";

import { Expand, Minimize2 } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import {
  EditorActions,
  EditorControls,
  Help,
  TextEditor,
} from "@/components/edit";

import type { GardenTypes } from "@/generated/garden.types";

interface SchemaEditorProps {
  onSchemaChange: (schema: GardenTypes) => void;
  garden?: GardenTypes;
}

const LOCAL_STORAGE_KEY = "garden-schema-editor-content";

const SchemaEditor = ({ onSchemaChange, garden }: SchemaEditorProps) => {
  // Initialize schema text with current garden or stored value
  const [schemaText, setSchemaText] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

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

          <TabsContent value="editor" className="mt-0 flex flex-col gap-4">
            <div className="flex w-full justify-end gap-2">
              <EditorControls />

              <Sheet>
                <SheetTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    title="Expand Editor"
                    className="h-7 w-7"
                  >
                    <Expand size={16} />
                  </Button>
                </SheetTrigger>

                <SheetContent
                  className="grid h-[96vh] w-full grid-rows-layout rounded-2xl"
                  side="bottom"
                >
                  <SheetHeader>
                    <SheetTitle>Garden Editor</SheetTitle>

                    <SheetDescription>
                      Edit the JSON schema for your Garden visualization
                    </SheetDescription>
                  </SheetHeader>

                  <div className="flex w-full justify-center gap-2 md:justify-end">
                    <EditorControls />

                    <SheetClose asChild>
                      <Button
                        type="submit"
                        variant="outline"
                        size="icon"
                        className="h-7 w-7"
                      >
                        <Minimize2 size={16} />
                      </Button>
                    </SheetClose>
                  </div>

                  <TextEditor
                    error={error}
                    schemaText={schemaText}
                    setSchemaText={setSchemaText}
                    setError={setError}
                  />

                  <EditorActions
                    schemaText={schemaText}
                    setSchemaText={setSchemaText}
                    setError={setError}
                    onSchemaChange={onSchemaChange}
                    garden={garden}
                  />
                </SheetContent>
              </Sheet>
            </div>

            <div className="h-[400px]">
              <TextEditor
                error={error}
                schemaText={schemaText}
                setSchemaText={setSchemaText}
                setError={setError}
              />
            </div>
          </TabsContent>

          <TabsContent value="help">
            <Help />
          </TabsContent>
        </Tabs>
      </CardContent>

      <CardFooter>
        <EditorActions
          schemaText={schemaText}
          setSchemaText={setSchemaText}
          setError={setError}
          onSchemaChange={onSchemaChange}
          garden={garden}
        />
      </CardFooter>
    </Card>
  );
};

export default SchemaEditor;
