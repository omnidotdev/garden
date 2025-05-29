import { parseAsBoolean, parseAsInteger } from "nuqs/server";

const searchParams = {
  fontSize: parseAsInteger.withDefault(14),
  editorExpanded: parseAsBoolean.withDefault(false),
};

export default searchParams;
