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