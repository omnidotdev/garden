import { parseAsInteger } from "nuqs/server";

const searchParams = {
  fontSize: parseAsInteger.withDefault(14),
};

export default searchParams;
