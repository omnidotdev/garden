import { useQueryStates } from "nuqs";

import { searchParams } from "@/lib/constants";

const useSearchParams = () => useQueryStates(searchParams);

export default useSearchParams;
