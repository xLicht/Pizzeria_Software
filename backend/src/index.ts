import express from "express";
import path from "path";
import cors from "cors";
import { getConnection } from "./db";
import sql from "mssql";
import type { Pedido } from "../../common/types/types";
import type { Platillo} from "../../common/types/types"
import { getTodosLosPedidos } from "./services/pedidoService";
import { getTodosLosPlatillos} from "./services/platilloService";
import { getIdPedido } from "./services/pedidoService";
const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.get("/api/pedidos", async (_req, res) =>{
    try{
        const pedidos: Pedido[] = await getTodosLosPedidos();
        res.json(pedidos);
    } catch (error){
        res.status(500).json({error: "Error al obtener pedidos"});
    }
});

app.post("/api/pedidos/guardarPedido", async (req, res) => {
    const {
        tipo,
        precioTotal,
        extras,
        direccion,
        estado,
        idEmpleado,
        idCliente,
        platillos,
    } = req.body;

    let xml = `<Platillos>`;
    for (const p of platillos){
        xml+= `
        <Platillo>
            <idPlatillo>${p.idPlatillo}</idPlatillo>
            <cantidad>${p.cantidad}</cantidad>
      </Platillo>`;
    }
    xml += `</Platillos>`;

    try{
        const pool = await getConnection();
        const transaction = pool.transaction();
        await transaction.begin();

        const request = transaction.request();
        request.input("tipo", tipo);
        request.input("precioTotal", precioTotal);
        request.input("extras", extras);
        request.input("direccion", direccion);
        request.input("estado", estado);
        request.input("idEmpleado", idEmpleado);
        request.input("idCliente", idCliente);
        request.input("listaPlatillos", xml);

        await request.execute("InsertarPedido");

        await transaction.commit();
        res.sendStatus(201);
    } catch (err: any) {
    console.error("Error insertando pedido:", err);
    res.status(500).json({ error: err.message });
  }
})

app.get("/api/pedidos/idPedido", async (_req, res) => {
    try{
        const idPedido: number = await getIdPedido();
        res.json(idPedido);
    } catch (error){
        res.status(500).json({error: "Error al obtener el idPedido"});
    }
});

app.get ("/api/platillos", async (_req, res) =>{
    try{
        const platillos: Platillo[] = await getTodosLosPlatillos();
        res.json(platillos);
    } catch (error){
        res.status(500).json({error: "Error al obtener los platillos"});
    }
})

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
})