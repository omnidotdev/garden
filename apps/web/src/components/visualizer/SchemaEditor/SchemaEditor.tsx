"use client";

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@workspace/ui/components/card";
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
} from "@workspace/ui/components/sheet";
import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from "@workspace/ui/components/tabs";
import { useEffect, useState } from "react";
import {
	EditorActions,
	EditorControls,
	SchemaHelp,
	TextEditor,
} from "@/components/visualizer";
import { useSearchParams } from "@/lib/hooks";
import { useGardenStore } from "@/lib/hooks/store";

/**
 * Schema Editor.
 */
const SchemaEditor = () => {
	const [schemaText, setSchemaText] = useState<string>("");
	const [error, setError] = useState<string | null>(null);
	const [{ editorExpanded }, setSearchParams] = useSearchParams();

	const { activeGarden } = useGardenStore();

	const title = "Garden Editor";
	const description = "Edit the JSON schema for your Garden visualization";

	// update schema text when activeGarden changes
	useEffect(() => {
		setSchemaText(JSON.stringify(activeGarden, null, 2));
	}, [activeGarden]);

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
								className="grid w-full grid-rows-layout rounded-2xl h-11/12 p-4"
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

								<EditorActions schemaText={schemaText} setError={setError} />
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

						<EditorActions schemaText={schemaText} setError={setError} />
					</TabsContent>

					<TabsContent value="help">
						<SchemaHelp />
					</TabsContent>
				</Tabs>
			</CardContent>
		</Card>
	);
};

export default SchemaEditor;
