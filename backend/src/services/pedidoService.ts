import { getConnection } from "../db";
import type { Pedido as PedidoDB} from "../../../common/types/types";

export async function getTodosLosPedidos(): Promise<PedidoDB[]> {
  const pool = await getConnection();
  // Traemos los campos tal y como están en la BD
  const result = await pool.request().query(`
    SELECT 
      idPedido,
      tipo,
      precioTotal,
      extras,
      direccion,
      estado,
      idEmpleado,
      idCliente,
      Pagado
    FROM Cliente_Pedido_Empleado
  `);

  // Mapeamos Pagado (0|1) a boolean
  return result.recordset.map((row: any) => ({
    idPedido: row.idPedido,
    tipo: row.tipo ?? undefined,
    precioTotal: Number(row.precioTotal),
    extras: row.extras ?? undefined,
    direccion: row.direccion,
    estado: row.estado ?? undefined,
    idEmpleado: row.idEmpleado ?? undefined,
    idCliente: row.idCliente ?? undefined,
    pagado: row.Pagado === 1,
  }));
}