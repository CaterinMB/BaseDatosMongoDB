//-------------PRODUCTOS----------------//

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
      "id_Producto" : 101,
      "nom_Producto" : "Espátulas",
      "precio_venta" : 10000,
      "cant_productos" : 30,
      "estado" : true,
      "categoria" : "pizza",
      "insumo": ""
    });

    //insertmany
    await CreateMany(client,[{
      "id_Producto" : 102,
      "nom_Producto" : "Bolsas para Asar",
      "precio_venta" : 28000,
      "cant_productos" : 45,
      "estado" : true,
      "categoria" : "bebida",
      "insumo": ""
    },
    {
      "id_Producto" : 103,
      "nom_Producto" : "Estuche de vapor",
      "precio_venta" : 215000,
      "cant_productos" : 73,
      "estado" : true,
      "categoria" : "Bar",
      "insumo": ""
    },
    {
      "id_Producto" : 104,
      "nom_Producto" : "Azucarero",
      "precio_venta" : 35000,
      "cant_productos" : 90,
      "estado" : true,
      "categoria" : "bebidas",
      "insumo": ""
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
async function Createone(client , producto){
  await client.db("Pach_OS").collection("Productos").insertOne(producto);
  console.log("producto Registrada Exitosamente");
}
 
 
//insertmany
async function CreateMany(client, productos){
  await client.db("Pach_OS").collection("Productos").insertMany(productos);
  console.log("Productos Registradas Exitosamente");
}
 
/////////////***** Read ******////////////////
 
//Findone
async function FindOne(client){
  const query = {id_producto: 36}
  const  result = await client.db("Pach_OS").collection("Productos").findOne(query);
  console.log(result)
}
 
//Find and Example Limit
async function buscar(client){
  const query = {nom_Producto: 'Espátulas'}
  const  result = await client.db("Pach_OS").collection("Productos").find(query).limit(3).toArray();
  console.log(result)
}
 
/////////////***** Update *******//////////////////////
 
//Updateone
async function ActualizarUno(client){
  const query ={id_producto: 46};
  const result = await client.db("Pach_OS").collection("Productos").updateOne(query,{$set:{cant_productos: 93}});
  console.log("producto Actualizada")
}

//Updateone with ##upsert##

async function ActualizarUno(client){
  const query ={id_producto: 102};
  const X = await client.db("Pach_OS").collection("Productos").updateOne(query,{$set:{categoria: "pizza"}}, {upsert:true} );
  console.log(X)
  console.log("producto Actualizada")
}
 
//UpdateMany
async function ActualizarVarios(client){
  const query = {nom_Producto: "Azucarero"}
  const  X = await client.db("Pach_OS").collection("Productos").updateMany(query,{$set: {precio_venta: 305000}});
  console.log("producto Actualizada")
  console.log(X)
}
 
/////////////***** Delete *********///////////////
//Deleteone
async function borraruno(client){
  const query={id_producto: 54};
  const X =await client.db("Pach_OS").collection("Productos").deleteOne(query);
  console.log(X);
  console.log("Eliminado")
}
 
 
//DeleteMany
async function borrarvarios(client){
  const query={nom_Producto: "Anillo antigoteo"};
  const X =await client.db("Pach_OS").collection("Productos").deleteMany(query);
  console.log(X);
  console.log("Eliminacion")
}
 
//drop Collection
const dropCollection = (client) => {
  try{
    const result = client.db("Pach_OS").collection("Productos").drop()
    console.log('The collection was successfully deleted!!')
    return result
  }catch(error){
    console.log(error)
  }
}
 
//drop database
const dropDatabase = (client) => {
  try{
    const result = client.db("Pach_OS").dropDatabase()
    console.log('Deleted database successfully!!')
    return result
  }catch(error){
    console.log(error)
  }
}
 