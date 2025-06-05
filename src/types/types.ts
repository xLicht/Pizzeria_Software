// src/types/types.ts
import type { FC, ReactElement, SVGProps } from "react";

export interface NavItem {
  label: string;
  Icon: FC<SVGProps<SVGSVGElement>>;
  path: string;
  element: ReactElement;
}

export interface Pedido {
  id: string;
  cliente: string;
  fecha: string;
  estado: "Pendiente" | "Enviado" | "Entregado";
}
