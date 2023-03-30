const { MongoClient } = require("mongodb");

// Connection URI
const uri = "mongodb+srv://Pacho:Pacho12314@pach-os.bim9k0o.mongodb.net/?retryWrites=true&w=majority";

// Create a new MongoClient
const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    console.log("conectado");
    await insumostotales(client);
    await contarinsumos(client);
    await pipeline1(client);
    await pipeline2(client);
  } finally {
    await client.close();
  }
}

run().catch(console.dir);

async function insumostotales(client) {
  const X = await client
    .db("Pach_OS")
    .collection("Provedor")
    .aggregate([
      { $unwind: "$insumos_p" },
      { $count: "total" }
    ])
    .toArray();
  console.log(X);
}

async function contarinsumos(client) {
    const X = await client
      .db("Pach_OS")
      .collection("Provedor")
      .aggregate([
        { $unwind: "$insumos_p" },
        {
          $group: {
            _id: "$insumos_p",
            count: { $sum: 1 }
          }
        }
      ])
      .toArray();
    console.log(X);
  }

//ejemplo 1 del pipeline con sort y limit 
async function pipeline1(client) {
    const X = await client.db("Pach_OS").collection("Provedor").aggregate([
        { $match: { estado: false } },
        {
          $project: {
            _id: 0,
            id_Proveedor: 1,
            celular: 1,
            
            nombre: 1,
            total_insumos: { $size: "$insumos_p" } // contar la cantidad de insumos
          }
        },
        { $sort: { total_insumos: 1 } }, 
        { $limit: 10 } 
      ])
      .toArray();
  
    console.log(X);
}
//ejemplo 2 del pipeline con sort y limit 

async function pipeline2(client){
    const X = await client.db("Pach_OS").collection("Ventas").aggregate([
        { $match: { Efectivo: true } },
        {
          $project: {
            _id: 0,
            id_Venta: 1,
            id_Usuario: 1,
            id_Producto: 1,
            Fecha:1,
            Cantidad:1
          }
        },
        { $sort: { Cantidad: -1 } }, 
        { $limit: 10 } 
      ])
      .toArray();
  
    console.log(X);
}
