// src/types/types.ts
import type { FC, ReactElement, SVGProps } from "react";

export interface NavItem {
  label: string;
  Icon: FC<SVGProps<SVGSVGElement>>;
  path: string;
  element: ReactElement;
}
