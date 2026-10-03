import type { ReactNode } from "react";

// Remounts on every navigation, so each page fades in. The animation ends at
// `transform: none`, so it never becomes a containing block for fixed or sticky children.
export default function Template({ children }: { children: ReactNode }) {
  return <div className="page-enter">{children}</div>;
}
