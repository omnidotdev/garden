import { NuqsAdapter } from "nuqs/adapters/next/app";

import type { PropsWithChildren } from "react";

const NuqsProvider = ({ children }: PropsWithChildren) => (
  <NuqsAdapter>{children}</NuqsAdapter>
);

export default NuqsProvider;
