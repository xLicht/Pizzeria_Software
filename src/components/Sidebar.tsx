import { Bars3Icon } from "@heroicons/react/24/outline";
import { useState } from "react";
import type { NavItem } from "../types/types";
interface Props {
  items: NavItem[];
  heading: string;
}
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ heading, items }: Props) => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  return (
    <>
      <aside
        className={`bg-gray-800 text-gray-100 h-screen flex flex-col transition-width duration-300 ${
          collapsed ? "w-22" : "w-64"
        }`}
      >
        <div className="flex items-center justify-center px-4 py-3 border-b border-gray-700">
          {!collapsed && (
            <h1
              className="text-2x1 font-bold cursor-pointer"
              onClick={() => navigate("/")}
            >
              {heading}
            </h1>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className={
              collapsed
                ? "p-1 hover:bg-gray-700 rounded-md"
                : "p-1 hover:bg-gray-700 rounded-md ml-auto"
            }
          >
            <Bars3Icon className="h-5 w-5" />
          </button>
        </div>
        {items.map((item, index) => (
          <nav key={index} className="overflow-y-auto mt-4">
            <ul className="space-y-2 px-4">
              <li>
                <NavLink
                  to={item.path}
                  className={
                    collapsed
                      ? "flex items-center px-3 py-2 rounded-md hover: bg-gray-700 transition-colors justify-center"
                      : "flex items-center px-3 py-2 rounded-md hover: bg-gray-700 transition-colors"
                  }
                  onClick={() =>
                    console.log(
                      "Sidebar → clic en NavLink:",
                      item.label,
                      item.path
                    )
                  }
                >
                  <item.Icon
                    className={
                      collapsed
                        ? "h-5 w-5 justify-center"
                        : "h-5 w-5 justify-center mr-3"
                    }
                  />
                  {!collapsed && <span key={index}>{item.label}</span>}
                </NavLink>
              </li>
            </ul>
          </nav>
        ))}
      </aside>
    </>
  );
};

export default Sidebar;
