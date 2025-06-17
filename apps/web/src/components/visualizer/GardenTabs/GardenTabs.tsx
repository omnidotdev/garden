"use client";

import { Garden } from "@omnidotdev/garden";
import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from "@workspace/ui/components/tabs";
import { BarChartIcon, CodeIcon } from "lucide-react";
import { SchemaEditor } from "@/components/visualizer";
import { useSearchParams } from "@/lib/hooks";
import { useGardenStore } from "@/lib/hooks/store";

/**
 * Garden Tabs.
 */
const GardenTabs = () => {
	const { activeGarden } = useGardenStore();

	const [{ activeTab }, setSearchParams] = useSearchParams();

	return (
		<Tabs
			value={activeTab}
			onValueChange={() =>
				setSearchParams({
					activeTab: activeTab === "visualize" ? "edit" : "visualize",
				})
			}
			className="flex h-full flex-col"
		>
			<TabsList className="grid w-full grid-cols-2 md:max-w-md">
				<TabsTrigger value="visualize" className="flex items-center gap-2">
					<BarChartIcon size={16} />
					Visualize Garden
				</TabsTrigger>

				<TabsTrigger value="edit" className="flex items-center gap-2">
					<CodeIcon size={16} />
					Edit Garden
				</TabsTrigger>
			</TabsList>

			<TabsContent value="visualize" className="mt-6 flex-1">
				<div className="h-full w-full">
					<Garden schema={activeGarden} />
				</div>
			</TabsContent>

			<TabsContent value="edit" className="mt-6">
				<SchemaEditor />
			</TabsContent>
		</Tabs>
	);
};

export default GardenTabs;
