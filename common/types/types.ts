// src/types/types.ts
import type { FC, ReactElement, SVGProps } from "react";

export interface NavItem {
  label: string;
  Icon: FC<SVGProps<SVGSVGElement>>;
  path: string;
  element: ReactElement;
}

export interface Pedido {
  idPedido: number;
  tipo?: string;
  precioTotal: number;
  extras?: string;
  direccion: string;
  estado?: string;
  idEmpleado?: number;
  idCliente?: number;
  pagado: boolean;
}
