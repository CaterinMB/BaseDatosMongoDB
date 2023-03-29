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