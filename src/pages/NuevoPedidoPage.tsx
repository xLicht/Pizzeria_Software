import Button from "../components/Button";
import TextBox from "../components/TextBox";
import Grid from "../components/Grid";
import type { Platillo } from "../../common/types/types"; // ajusta según tu tipo
import { useState, useEffect } from "react";

const menuColumns = [
  { header: "IdPlatillo", accessor: (p: Platillo) => p.idPlatillo },
  { header: "Nombre", accessor: (p: Platillo) => p.nombre },
  { header: "Precio", accessor: (p: Platillo) => `$${p.precio.toFixed(2)}` },
];

const pedidoColumns = [
  { header: "IdPlatillo", accessor: (p: Platillo) => p.idPlatillo },
  { header: "Nombre", accessor: (p: Platillo) => p.nombre },
  { header: "Precio", accessor: (p: Platillo) => `$${p.precio.toFixed(2)}` },
  { header: "Cantidad", accessor: () => "0" }, // si aún no aplicas la lógica
];

export default function NuevoPedidoPage() {
  const [menuData, setMenuData] = useState<Platillo[]>([]);
  const [loading, setLoading] = useState(true);

  const [pedidoData, setPedidoData] = useState<
    (Platillo & { cantidad: number })[]
  >([]);

  const agregarPlatilloAPedido = (platillo: Platillo) => {
    setPedidoData((prev) => {
      const existe = prev.find((p) => p.idPlatillo === platillo.idPlatillo);
      if (existe) return prev;
      return [...prev, { ...platillo, cantidad: 1 }];
    });
  };

  useEffect(() => {
    const fetchPlatillos = async () => {
      try {
        const resp = await fetch("http://localhost:4000/api/platillos");
        const json = await resp.json();
        setMenuData(json);
      } catch (error) {
        console.error("Error al traer platillos:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPlatillos();
    console.log(menuData);
  }, []);
  return (
    <div className="min-h-screen bg-red-50">
      <div className="py-2 px-10 justify-items-center bg-red-900">
        <h1 className="text-3xl font-bold text-white">Nuevo Pedido</h1>
      </div>
      <div className="px-4 pt-8">
        {/* Padre flex para centrar */}
        <div className="flex justify-center">
          {/* inline-grid para que la grid mida sólo su contenido */}
          <div className="inline-grid grid-cols-[auto_auto] gap-x-2 gap-y-4 justify-items-start items-center">
            {/* Empleado */}
            <div className="flex items-center gap-2">
              <label className="w-24 text-gray-700">Empleado:</label>
              <TextBox
                className="w-60"
                inputClassName="h-7 bg-amber-200 border-2 border-amber-500"
                placeholder="Nombre"
              />
            </div>
            <div className="flex items-center gap-2">
              <Button className="border-2 w-66 font-semibold h-10 bg-amber-200 border-amber-500">
                Buscar Cliente
              </Button>
            </div>
            {/* ID Pedido */}
            <div className="flex items-center gap-2">
              <label className="w-24 text-gray-700">ID Pedido:</label>
              <TextBox
                className="w-40"
                inputClassName="h-7 bg-amber-200 border-2 border-amber-500"
                placeholder="12345"
              />
            </div>
            {/* Dirección */}
            <div className="flex items-center gap-2">
              <label className="w-24 text-gray-700">Cliente:</label>
              <TextBox
                className="w-40"
                inputClassName="h-7 bg-amber-200 border-2 border-amber-500"
                placeholder="Calle, número"
              />
            </div>
            <div className="flex items-center gap-2">
              <label className="w-24 text-gray-700">Calle:</label>
              <TextBox
                className="w-40"
                inputClassName="h-7 bg-amber-200 border-2 border-amber-500"
                placeholder="Calle, número"
              />
            </div>
            <div className="flex items-center gap-2">
              <label className="w-24 text-gray-700">IdCliente:</label>
              <TextBox
                className="w-40"
                inputClassName="h-7 bg-amber-200 border-2 border-amber-500"
                placeholder="Calle, número"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Sección inferior con tablas y extras */}
      <div className="mt-10 px-6">
        <div className="grid grid-cols-3 gap-6 p-6 rounded-md">
          {/* Tabla Menú */}
          <div>
            <h2 className="text-black text-xl font-bold text-center mb-2">
              Menú
            </h2>
            <Grid
              containerClassName="border border-red-700"
              tableClassName="divide-y divide-red-700"
              headClassName="bg-red-200 text-red-900"
              evenRowClassName="bg-red-50"
              oddRowClassName="bg-red-100"
              rowDividerClassName="divide-red-700"
              columns={menuColumns}
              data={menuData}
              heightClass="h-72"
            />
          </div>

          {/* Tabla Pedido */}
          <div>
            <h2 className="text-black text-xl font-bold text-center mb-2">
              Pedido
            </h2>
            <Grid
              containerClassName="border border-red-700"
              tableClassName="divide-y divide-red-700"
              headClassName="bg-red-200 text-red-900"
              evenRowClassName="bg-red-50"
              oddRowClassName="bg-red-100"
              rowDividerClassName="divide-red-700"
              columns={pedidoColumns}
              data={pedidoData}
              heightClass="h-72"
            />
          </div>

          {/* Extras y Total */}
          <div className="flex flex-col justify-start">
            <h2 className="text-black text-xl font-bold mb-2">Extras</h2>
            <textarea className="h-[150px] border-2 bg-amber-200 border-amber-500 resize-none mb-4"></textarea>

            <h2 className="text-black text-xl font-bold mb-1">Total</h2>
            <TextBox
              className="w-40"
              inputClassName="h-7 bg-amber-200 border-2 border-amber-500"
              placeholder="Calle, número"
            />

            <div className="flex gap-4 py-2">
              <button className="bg-amber-400 px-4 py-2 rounded font-bold text-black hover:bg-amber-500 shadow-md">
                Pagar
              </button>
              <button className="bg-amber-400 px-4 py-2 rounded font-bold text-black hover:bg-amber-500 shadow-md">
                Guardar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
