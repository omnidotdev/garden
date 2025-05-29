"use client";

import Editor from "@monaco-editor/react";
import { Check, Copy, AlertCircle } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import useSearchParams from "@/lib/hooks/useSearchParams";

interface Props {
  schemaText: string;
  setSchemaText: (text: string) => void;
  error: string | null;
  setError: (error: string | null) => void;
}

const TextEditor = ({ schemaText, setSchemaText, error, setError }: Props) => {
  const { resolvedTheme } = useTheme();
  const [editorTheme, setEditorTheme] = useState<string>("light");
  const [copied, setCopied] = useState(false);

  const [{ fontSize }] = useSearchParams();

  const copyToClipboard = () => {
    navigator.clipboard.writeText(schemaText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Update editor theme when system/site theme changes
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
          className="h-8 w-8"
        >
          {copied ? <Check size={16} /> : <Copy size={16} />}
        </Button>

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
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
