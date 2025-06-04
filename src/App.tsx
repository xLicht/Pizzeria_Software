import {
  CurrencyDollarIcon,
  ClipboardDocumentListIcon,
  UserCircleIcon,
  TableCellsIcon,
  Bars4Icon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import VentaPage from "./pages/MenuVentaPage";
import { Routes, Route } from "react-router-dom";
import type { NavItem } from "./types/types";

import Sidebar from "./components/Sidebar";
import MenuPrincipalPage from "./pages/MenuPrincipalPage";
import MenuPedidosPage from "./pages/MenuPedidosPage";
import MenuClientesPage from "./pages/MenuClientesPage";
import MenuInventarioPage from "./pages/MenuInventarioPage";
import MenuMenuPage from "./pages/MenuMenuPage";
import MenuEmpleadosPage from "./pages/MenuEmpleadosPage";
const App = () => {
  const navBar: NavItem[] = [
    {
      label: "Venta",
      Icon: CurrencyDollarIcon,
      path: "/venta",
      element: <VentaPage />,
    },
    {
      label: "Pedidos",
      Icon: ClipboardDocumentListIcon,
      path: "/pedidos",
      element: <MenuPedidosPage />,
    },
    {
      label: "Clientes",
      Icon: UserCircleIcon,
      path: "/clientes",
      element: <MenuClientesPage />,
    },
    {
      label: "Inventario",
      Icon: TableCellsIcon,
      path: "/inventario",
      element: <MenuInventarioPage />,
    },
    {
      label: "Menu",
      Icon: Bars4Icon,
      path: "/menu",
      element: <MenuMenuPage />,
    },
    {
      label: "Empleados",
      Icon: UserGroupIcon,
      path: "/empleados",
      element: <MenuEmpleadosPage />,
    },
  ];
  console.log("App → navBar:", navBar);
  return (
    <div className="flex h-screen">
      <Sidebar items={navBar} heading="Pizzeria"></Sidebar>
      <main className="flex-1 overflow-y-auto">
        <Routes>
          <Route path="/" element={<MenuPrincipalPage />} />
          {navBar.map((item) => (
            <Route key={item.path} path={item.path} element={item.element} />
          ))}
          <Route
            path="*"
            element={<p className="p-6">404 – Página no encontrada</p>}
          />
        </Routes>
      </main>
    </div>
  );
};

export default App;
