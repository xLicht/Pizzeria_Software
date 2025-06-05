import express from "express";
import cors from "cors";
import { getConnection } from "./db";
import sql from "mssql";
import type { Pedido } from "../../common/types/types";
import { getTodosLosPedidos } from "./services/pedidoService";
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

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
})