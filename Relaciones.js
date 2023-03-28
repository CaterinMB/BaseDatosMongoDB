const { MongoClient, Db } = require("mongodb");
const uri = "mongodb+srv://Pacho:Pacho12314@pach-os.bim9k0o.mongodb.net/test";
const client = new MongoClient(uri);

use("Pach_OS")
db.Usuarios.aggregate([
    {
        $lookup: {
            from: "Ventas",
            localField: "id_Usuario",
            foreignField: "id_Usuario",
            as: "usuario_venta"
        }
    }
])

db.Productos.aggregate([
    {
        $lookup: {
            from: "Ventas",
            localField: "id_Producto",
            foreignField: "id_Producto",
            as: "producto_venta"
        }
    }
])

db.Proveedores.aggregate([
    {
        $lookup: {
            from: "Productos",
            localField: "insumo",
            foreignField: "insumos_p",
            as: "proveedores_producto"
        }
    }
])
