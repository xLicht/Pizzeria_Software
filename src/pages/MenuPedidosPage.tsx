import Button from "../components/Button";
import TextBox from "../components/TextBox";
import Grid from "../components/Grid";
import type { Pedido } from "../../common/types/types";
import { useState, useEffect } from "react";

export default function MenuPedidosPage() {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchPedidos = async () => {
      try {
        const resp = await fetch("http://localhost:4000/api/pedidos");
        const json = await resp.json();
        setPedidos(json);
      } catch (error) {
        console.error("Error al traer pedidos:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPedidos();
  }, []);

  const columns = [
    { header: "ID", accessor: (p: Pedido) => p.idPedido, widthClass: "w-20" },
    { header: "Tipo", accessor: (p: Pedido) => p.tipo ?? "-" },
    {
      header: "Precio",
      accessor: (p: Pedido) => `$${p.precioTotal.toFixed(2)}`,
    },
    { header: "Extras", accessor: (p: Pedido) => p.extras ?? "-" },
    { header: "Dirección", accessor: (p: Pedido) => p.direccion },
    { header: "Estado", accessor: (p: Pedido) => p.estado ?? "-" },
    {
      header: "Empleado",
      accessor: (p: Pedido) =>
        p.idEmpleado !== undefined ? p.idEmpleado : "-",
    },
    {
      header: "Cliente",
      accessor: (p: Pedido) => (p.idCliente !== undefined ? p.idCliente : "-"),
    },
    {
      header: "Pagado",
      accessor: (p: Pedido) => (p.pagado ? "Sí" : "No"),
    },
  ];
  return (
    <>
      <div className="py-2 justify-items-center bg-gray-800">
        <h1 className="text-3xl font-bold text-white">Página de Pedidos</h1>
      </div>
      <div className="flex justify-center items-center gap-4 px-4 pt-8">
        <h2 className="text-2xl">Buscar por ID:</h2>
        <TextBox className="w-70" inputClassName="w-full h-7" />
        <Button className="border-0 w-30 font-semibold h-7">Buscar</Button>
      </div>
      <div className="flex justify-center items-center px-4 pt-6">
        {loading ? (
          <p>Cargando Pedidos ...</p>
        ) : (
          <Grid columns={columns} data={pedidos} heightClass="h-64" />
        )}
      </div>
    </>
  );
}
