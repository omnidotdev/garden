"use client";

import { useEffect, useState } from "react";

import {
  EditorActions,
  EditorControls,
  SchemaHelp,
  TextEditor,
} from "components/visualizer";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "components/ui";
import useSearchParams from "lib/hooks/useSearchParams";

import type { GardenTypes } from "generated/garden.types";

interface SchemaEditorProps {
  onSchemaChange: (schema: GardenTypes) => void;
  garden?: GardenTypes;
}

const LOCAL_STORAGE_KEY = "garden-schema-editor-content";

const SchemaEditor = ({ onSchemaChange, garden }: SchemaEditorProps) => {
  // Initialize schema text with current garden or stored value
  const [schemaText, setSchemaText] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [{ editorExpanded }, setSearchParams] = useSearchParams();

  const title = "Garden Editor";
  const description = "Edit the JSON schema for your Garden visualization";

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
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="editor">
          <TabsList>
            <TabsTrigger value="editor">JSON Editor</TabsTrigger>
            <TabsTrigger value="help">Schema Help</TabsTrigger>
          </TabsList>

          <TabsContent value="editor" className="mt-0 flex flex-col gap-4">
            <EditorControls />

            <Sheet
              open={editorExpanded}
              onOpenChange={(open) => setSearchParams({ editorExpanded: open })}
            >
              <SheetContent
                className="grid h-[96vh] w-full grid-rows-layout rounded-2xl"
                side="bottom"
              >
                <SheetHeader className="flex flex-col items-start">
                  <SheetTitle>{title}</SheetTitle>
                  <SheetDescription>{description}</SheetDescription>
                </SheetHeader>

                <EditorControls />

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
            <SchemaHelp />
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
