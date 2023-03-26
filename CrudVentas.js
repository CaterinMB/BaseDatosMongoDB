//-------------VENTAS----------------//

const { MongoClient, Db } = require("mongodb");
// Connection URI
const uri = "mongodb+srv://Pacho:Pacho12314@pach-os.bim9k0o.mongodb.net/test";
// Create a new MongoClient
const client = new MongoClient(uri);
async function run() {
  try {
    await client.connect();
    
    //insertone
    await Createone(client ,{
      "id_Venta" : 101,
      "id_Usuario" : 74,
      "id_Producto" : 52,
      "Fecha" : 2022-4-23,
      "Cliente" : "Liyi",
      "Total" : 10409,
      "Cantidad" : 8,
      "Efectivo" : true
    });

    //insertmany
    await CreateMany(client,[{
      "id_Venta" : 102,
      "id_Usuario" : 29,
      "id_Producto" : 46,
      "Fecha" : 2022-5-3,
      "Cliente" : "Daela",
      "Total" : 13500,
      "Cantidad" : 5,
      "Efectivo" : false
    },
    {
      "id_Venta" : 103,
      "id_Usuario" : 48,
      "id_Producto" : 19,
      "Fecha" : 2022-9-25,
      "Cliente" : "Isabella",
      "Total" : 28500,
      "Cantidad" :4,
      "Efectivo" : true
    },
    {
      "id_Venta" : 104,
      "id_Usuario" : 93,
      "id_Producto" : 49,
      "Fecha" : 2022-11-2,
      "Cliente" : "Emmanuel",
      "Total" : 50500,
      "Cantidad" : 6,
      "Efectivo" : true
    }]
    )


//Findone
await FindOne(client);

//Find
await buscar(client);

//Updateone y ##upsert##
await ActualizarUno(client);

//UpdateMany
await ActualizarVarios(client);


//Deleteone
await borraruno(client);

//DeleteMany
await borrarvarios(client);

//Drop Collection
const result1 = await dropCollection(client);

//Drop DATABASE
const result = await dropDatabase(client);

    await client.db("Pach_OS").command({ ping: 1 });
    console.log("Connected successfully to server");

  } finally {
    await client.close();
  }
}
run().catch(console.dir);




/////////////***** Create *****///////////////////
//insertone
async function Createone(client , venta){
  await client.db("Pach_OS").collection("Ventas").insertOne(venta);
  console.log("Venta Registrada Exitosamente");
}

//insertmany
async function CreateMany(client, ventas){
  await client.db("Pach_OS").collection("Ventas").insertMany(ventas);
  console.log("Ventas Registradas Exitosamente");
}

/////////////***** Read ******////////////////
//Findone
async function FindOne(client){
  const query = {id_Venta: 81}
  const  result = await client.db("Pach_OS").collection("Ventas").findOne(query);
  console.log(result)
}

//Find and Example Limit
async function buscar(client){
  const query = {Cliente: 'Liyi'}
  const  result = await client.db("Pach_OS").collection("Ventas").find(query).limit(3).toArray();
  console.log(result)
}

/////////////***** Update *******//////////////////////

//     // //Updateone
async function ActualizarUno(client){
  const query ={id_Venta: 38};
  const result = await client.db("Pach_OS").collection("Ventas").updateOne(query,{$set:{id_Producto: 53}});
  console.log("Venta Actualizada")
}

//     // //Updateone with ##upsert##
async function ActualizarUno(client){
  const query ={id_Venta: 52};
  const X = await client.db("Pach_OS").collection("Ventas").updateOne(query,{$set:{Efectivo: false}}, {upsert:true} );
  console.log(X)
  console.log("Venta Actualizada")
}

//    // //UpdateMany
async function ActualizarVarios(client){
  const query = {Cliente: "Juan"}
  const  X = await client.db("Pach_OS").collection("Ventas").updateMany(query,{$set: {Total: 45800}});
  console.log("Venta Actualizada")
  console.log(X)
}

/////////////***** Delete *********///////////////
//     // //Deleteone
async function borraruno(client){
  const query={id_Venta: 103};
  const X =await client.db("Pach_OS").collection("Ventas").deleteOne(query);
  console.log(X);
  console.log("Eliminado")
}

//    // //DeleteMany
async function borrarvarios(client){
  const query={Cliente: "Emmanuel"};
  const X =await client.db("Pach_OS").collection("Ventas").deleteMany(query);
  console.log(X);
  console.log("Eliminacion")
}


//  // //drop Collection
const dropCollection = (client) => {
    try{
        const result = client.db("Pach_OS").collection("Ventas").drop()
        console.log('The collection was successfully deleted!!')
        return result
    }catch(error){
        console.log(error)
    }
}


//  //  //drop database
const dropDatabase = (client) => {
    try{
        const result = client.db("Pach_OS").dropDatabase()
        console.log('Deleted database successfully!!')
        return result
    }catch(error){
        console.log(error)
    }
}