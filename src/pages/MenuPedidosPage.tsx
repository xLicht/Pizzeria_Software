import Button from "../components/Button";
import TextBox from "../components/TextBox";
import Grid from "../components/Grid";
import type { Pedido } from "../types/types";
import { useState, useEffect } from "react";

export default function MenuPedidosPage() {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  useEffect(() => {
    const simulados: Pedido[] = [
      {
        id: "001",
        cliente: "Ana López",
        fecha: "2025-06-01",
        estado: "Pendiente",
      },
      {
        id: "002",
        cliente: "Carlos Ruiz",
        fecha: "2025-06-02",
        estado: "Enviado",
      },
      {
        id: "003",
        cliente: "María Peréz",
        fecha: "2025-06-03",
        estado: "Entregado",
      },
    ];
    setPedidos(simulados);
  });

  const columns = [
    {
      header: "ID",
      accessor: (p: Pedido) => p.id,
      widthClass: "w-24",
    },
    {
      header: "Cliente",
      accessor: (p: Pedido) => p.cliente,
      widthClass: "w-1/3",
    },
    {
      header: "Fecha",
      accessor: (p: Pedido) => p.fecha,
      widthClass: "w-1/4",
    },
    {
      header: "Estado",
      accessor: (p: Pedido) => {
        let color = "text-gray-700";
        if (p.estado === "Pendiente") color = "text-yellow-600";
        if (p.estado === "Enviado") color = "text-blue-600";
        if (p.estado === "Entregado") color = "text-green-600";
        return <span className={color}>{p.estado}</span>;
      },
      widthClass: "w-32",
    },
  ];
  return (
    <>
      <div className="py-2 justify-items-center bg-amber-400">
        <h1 className="text-3xl font-bold">Página de Pedidos</h1>
      </div>
      <div className="flex justify-center items-center gap-4 px-4 pt-8">
        <h2 className="text-2xl">Buscar por ID:</h2>
        <TextBox className="w-70" inputClassName="w-full h-7" />
        <Button className="border-0 w-30 font-semibold h-7">Buscar</Button>
      </div>
      <div className="flex justify-center items-center px-4 pt-6">
        <Grid columns={columns} data={pedidos} heightClass="h-64" />
      </div>
    </>
  );
}
