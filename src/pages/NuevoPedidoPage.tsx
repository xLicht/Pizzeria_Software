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
];

export default function NuevoPedidoPage() {
  const [menuData, setMenuData] = useState<Platillo[]>([]);
  const [loading, setLoading] = useState(true);
  const [idPedidoQ, setIdPedidoQ] = useState<number>();

  const [pedidoData, setPedidoData] = useState<Platillo[]>([]);

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

  useEffect(() => {
    const fetchIdPedido = async () => {
      try {
        const resp = await fetch("http://localhost:4000/api/pedidos/idPedido");
        const json = await resp.json();
        setIdPedidoQ(json);
      } catch (error) {
        console.log("Error al traer idPedido:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchIdPedido();
    console.log(idPedidoQ);
  });

  async function handleGuardarPedido() {
    try {
      const resp = await fetch(
        "http://localhost:4000/api/pedidos/guardarPedido",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            tipo,
            precioTotal,
            extras,
            direccion,
            estado,
            idEmpleado,
            idCliente,
            platillos: platillosParaEnviar,
          }),
        }
      );
      if (!resp.ok) throw new Error(await resp.text());
    } catch (err) {
      console.error(err);
      alert("Error guardando el pedido: " + err);
    }
  }

  function copyRow<T>(
    row: T,
    _source: [T[], React.Dispatch<React.SetStateAction<T[]>>],
    [target, setTarget]: [T[], React.Dispatch<React.SetStateAction<T[]>>]
  ) {
    setTarget([...target, row]);
  }
  function deleteRow<T>(
    row: T,
    [list, setList]: [T[], React.Dispatch<React.SetStateAction<T[]>>]
  ) {
    const idx = list.findIndex((r) => r === row);
    if (idx < 0) return;
    const newList = [...list.slice(0, idx), ...list.slice(idx + 1)];
    setList(newList);
  }

  const handleMenuRowClick = (row: Platillo) => {
    copyRow(row, [menuData, setMenuData], [pedidoData, setPedidoData]);
  };

  const handlePedidoRowClick = (row: Platillo) => {
    deleteRow(row, [pedidoData, setPedidoData]);
  };

  const counter = new Map<number, number>();
  pedidoData.forEach((p) => {
    counter.set(p.idPlatillo, (counter.get(p.idPlatillo) || 0) + 1);
  });

  const platillosParaEnviar = Array.from(counter.entries()).map(
    ([idPlatillo, cantidad]) => ({ idPlatillo, cantidad })
  );

  const [tipo, setTipo] = useState<string>("Domicilio");
  const [estado, setEstado] = useState<string>("Pendiente");
  const [precioTotal, setPrecioTotal] = useState("");
  const [extras, setExtras] = useState("");
  const [direccion, setDireccion] = useState("");
  const [idEmpleado, setIdEmpleado] = useState("");
  const [idCliente, setIdCliente] = useState("");
  const [nomCliente, setNomCliente] = useState("");
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
                placeholder="Id"
                value={idEmpleado}
                onChange={(e) => setIdEmpleado(e.target.value)}
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
                value={idPedidoQ?.toString()}
              />
            </div>
            {/* Nombre Cliente */}
            <div className="flex items-center gap-2">
              <label className="w-24 text-gray-700">Cliente:</label>
              <TextBox
                className="w-40"
                inputClassName="h-7 bg-amber-200 border-2 border-amber-500"
                placeholder="Nombre Cliente"
                value={nomCliente}
                onChange={(e) => setNomCliente(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <label className="w-24 text-gray-700">Calle:</label>
              <TextBox
                className="w-40"
                inputClassName="h-7 bg-amber-200 border-2 border-amber-500"
                placeholder="Calle"
                value={direccion}
                onChange={(e) => setDireccion(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <label className="w-24 text-gray-700">IdCliente:</label>
              <TextBox
                className="w-40"
                inputClassName="h-7 bg-amber-200 border-2 border-amber-500"
                placeholder="Id Cliente"
                value={idCliente}
                onChange={(e) => setIdCliente(e.target.value)}
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
              onRowClick={handleMenuRowClick}
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
              onRowClick={handlePedidoRowClick}
            />
          </div>

          {/* Extras y Total */}
          <div className="flex flex-col h-80">
            <h2 className="text-black text-xl font-bold mb-2">Extras</h2>
            <TextBox
              value={extras}
              className="w-70"
              inputClassName="h-7 bg-amber-200 border-2 border-amber-500"
              onChange={(e) => setExtras(e.target.value)}
            ></TextBox>

            <h2 className="text-black text-xl font-bold mb-1">Total</h2>
            <TextBox
              className="w-40"
              inputClassName="h-7 bg-amber-200 border-2 border-amber-500"
              value={precioTotal}
              onChange={(e) => setPrecioTotal(e.target.value)}
            />

            <div className="flex gap-4 justify-center mt-auto">
              <Button className="border-2 w-66 font-semibold h-10 bg-amber-200 border-amber-500">
                Pagar
              </Button>
              <Button
                onClick={handleGuardarPedido}
                className="border-2 w-66 font-semibold h-10 bg-amber-200 border-amber-500"
              >
                Guardar
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
