import type { Gardens } from "@/store";

declare global {
  interface Window {
    gardenData?: Gardens;
  }
}
