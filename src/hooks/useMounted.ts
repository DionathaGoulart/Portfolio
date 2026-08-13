"use client";
import { useSyncExternalStore } from "react";

const neverChanges = () => () => {};

/**
 * False on the server pass and during hydration, true after. Lets client-only UI
 * (like the theme toggles, whose state only exists in the browser) stay unrendered
 * until it can be correct, without a setState-in-effect.
 */
export function useMounted(): boolean {
  return useSyncExternalStore(
    neverChanges,
    () => true,
    () => false
  );
}
