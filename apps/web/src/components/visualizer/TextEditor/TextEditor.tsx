"use client";

import Editor from "@monaco-editor/react";
import { AlertCircleIcon, CheckIcon, CopyIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@workspace/ui/components/alert";
import { Button } from "@workspace/ui/components/button";
import { useSearchParams } from "@/lib/hooks";

interface Props {
  /** The current JSON schema text being edited. */
  schemaText: string;
  /** Function to update the schema text. */
  setSchemaText: (text: string) => void;
  /** Error message related to the schema. */
  error: string | null;
  /** Function to set or clear the current error message. */
  setError: (error: string | null) => void;
}

/**
 * Text Editor.
 */
const TextEditor = ({ schemaText, setSchemaText, error, setError }: Props) => {
  const [editorTheme, setEditorTheme] = useState<string>("light");
  const [copied, setCopied] = useState(false);

  const [{ fontSize }] = useSearchParams();
  const { resolvedTheme } = useTheme();

  const copyToClipboard = () => {
    navigator.clipboard.writeText(schemaText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    setEditorTheme(resolvedTheme === "dark" ? "vs-dark" : "light");
  }, [resolvedTheme]);

  return (
    <div className="relative h-full overflow-hidden rounded-md border">
      <Editor
        defaultLanguage="json"
        value={schemaText}
        theme={editorTheme}
        onChange={(value) => {
          if (value) setSchemaText(value);
          setError(null);
        }}
        options={{
          padding: { top: 10, bottom: 10 },
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
          fontSize,
          scrollbar: {
            vertical: "auto",
            horizontal: "auto",
          },
          automaticLayout: true,
          wordWrap: "on",
        }}
      />

      <div className="absolute top-4 right-6 z-10">
        <Button
          variant="outline"
          size="icon"
          onClick={copyToClipboard}
          title="Copy to clipboard"
        >
          {copied ? (
            <CheckIcon size={16} color="green" />
          ) : (
            <CopyIcon size={16} />
          )}
        </Button>

        {error && (
          <Alert variant="destructive">
            <AlertCircleIcon size={16} />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription className="max-h-32 overflow-auto font-mono text-xs">
              {error}
            </AlertDescription>
          </Alert>
        )}
      </div>
    </div>
  );
};

export default TextEditor;
