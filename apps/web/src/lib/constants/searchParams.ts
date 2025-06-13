import { parseAsBoolean, parseAsInteger, parseAsString } from "nuqs/server";

const searchParams = {
  fontSize: parseAsInteger.withDefault(14),
  editorExpanded: parseAsBoolean.withDefault(false),
  activeTab: parseAsString.withDefault("visualize"),
};

export default searchParams;
