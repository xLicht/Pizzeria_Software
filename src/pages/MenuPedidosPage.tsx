import Button from "../components/Button";
import TextBox from "../components/TextBox";
import Grid from "../components/Grid";
import type { Pedido } from "../../common/types/types";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

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
      <div className="min-h-screen bg-red-50">
        <div className="py-2 px-10 justify-items-center bg-red-900">
          <h1 className="text-3xl font-bold text-white">Página de Pedidos</h1>
        </div>
        <div className="flex justify-center items-center gap-4 px-4 pt-8">
          <h2 className="text-2xl">Buscar por ID:</h2>
          <TextBox
            className="w-70"
            inputClassName="w-full h-7 bg-amber-200 border-amber-500 border-2"
          />
          <Button className="border-2 w-30 font-semibold h-7 bg-amber-200 border-amber-500">
            Buscar
          </Button>
        </div>
        <div className="flex justify-center items-center px-4 pt-6">
          {loading ? (
            <p>Cargando Pedidos ...</p>
          ) : (
            <Grid
              columns={columns}
              data={pedidos}
              heightClass="h-64"
              containerClassName="border border-red-700"
              tableClassName="divide-y divide-red-700"
              headClassName="bg-red-200 text-red-900"
              evenRowClassName="bg-red-50"
              oddRowClassName="bg-red-100"
              rowDividerClassName="divide-red-700"
            />
          )}
        </div>
        <div className="flex justify-center items-center gap-4 px-4 pt-8">
          <Link to="/nuevo-pedido">
            <Button className="border-2 w-50 font-semibold h-10 bg-amber-200 border-amber-500">
              Nuevo Pedido
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
}
