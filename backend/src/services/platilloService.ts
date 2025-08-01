import { getConnection } from "../db";
import type { Platillo as PlatilloDB} from "../../../common/types/types";

export async function getTodosLosPlatillos(): Promise<PlatilloDB[]> {
  const pool = await getConnection();
  // Traemos los campos tal y como están en la BD
  const result = await pool.request().query(`
    select idPlatillo, nombre, precio, descripcion, estado from Platillo
  `);

  // Mapeamos Pagado (0|1) a boolean
  return result.recordset.map((row: any) => ({
    idPlatillo: row.idPlatillo,
    nombre: row.nombre,
    precio: Number(row.precio),
    descripcion: row.extras,
    estado: row.estado ?? undefined,
  }));
}