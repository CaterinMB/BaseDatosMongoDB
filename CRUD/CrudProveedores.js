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
      "id_Proveedor" : 101,
      "num_documento" : 1006905347,
      "nombre" : "María Luisa",
      "celular" : 3246089393,
      "correo" : "María_Luisa@gmail.com",
      "estado" : true,
      "insumos_p": ["Anillas niveladoras","Aros de presentacion" ,"Asador de manzanas"]
    });

    //insertmany
    await CreateMany(client,[{
      "id_Proveedor" : 102,
      "num_documento" : 1240934878,
      "nombre" : "Jorge Miguel",
      "celular" : 3003455890,
      "correo" : "Jorge_Miguel@gmail.com",
      "estado" : true,
      "insumos_p": ["Boquillas","Bote de residuos","Asador de manzanas"]
    },
    {
      "id_Proveedor" : 103,
      "num_documento" : 1005435347,
      "nombre" : "Juan Jose",
      "celular" : 3006080393,
      "correo" : "Juan_Jose@gmail.com",
      "estado" : true,
      "insumos_p": ["Aros de presentacion", "Espátulas", "Espátula de repostería"]
    },
    {
      "id_Proveedor" : 104,
      "num_documento" : 1010459347,
      "nombre" : "Jose Ricardo",
      "celular" : 3014789393,
      "correo" : "Jose_Ricardo@gmail.com",
      "estado" : true,
      "insumos_p": ["Atril" ,"Azucarero","Bolas de repostería"]
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
async function Createone(client , proveedor){
  await client.db("Pach_OS").collection("Proveedores").insertOne(proveedor);
  console.log("proveedor Registrada Exitosamente");
}

//insertmany
async function CreateMany(client, proveedors){
  await client.db("Pach_OS").collection("Proveedores").insertMany(proveedors);
  console.log("Proveedores Registradas Exitosamente");
}

/////////////***** Read ******////////////////
//Findone
async function FindOne(client){
  const query = {id_proveedor: 36}
  const  result = await client.db("Pach_OS").collection("Proveedores").findOne(query);
  console.log(result)
}

//Find and Example Limit
async function buscar(client){
  const query = {nom_proveedor: 'Espátulas'}
  const  result = await client.db("Pach_OS").collection("Proveedores").find(query).limit(3).toArray();
  console.log(result)
}

 /////////////***** Update *******//////////////////////
//Updateone
async function ActualizarUno(client){
  const query ={id_proveedor: 46};
  const result = await client.db("Pach_OS").collection("Proveedores").updateOne(query,{$set:{cant_proveedors: 93}});
  console.log("proveedor Actualizada")
}
 
 
//Updateone with ##upsert##
async function ActualizarUno(client){
  const query ={id_proveedor: 102};
  const X = await client.db("Pach_OS").collection("Proveedores").updateOne(query,{$set:{categoria: "pizza"}}, {upsert:true} );
  console.log(X)
  console.log("proveedor Actualizada")
}
//UpdateMany
async function ActualizarVarios(client){
  const query = {nom_proveedor: "Azucarero"}
  const  X = await client.db("Pach_OS").collection("Proveedores").updateMany(query,{$set: {precio_venta: 305000}});
  console.log("proveedor Actualizada")
  console.log(X)
}

/////////////***** Delete *********///////////////
//Deleteone
 async function borraruno(client){
  const query={id_proveedor: 54};
  const X =await client.db("Pach_OS").collection("Proveedores").deleteOne(query);
  console.log(X);
  console.log("Eliminado")
}

//DeleteMany
async function borrarvarios(client){
  const query={nom_proveedor: "Anillo antigoteo"};
  const X =await client.db("Pach_OS").collection("Proveedores").deleteMany(query);
  console.log(X);
  console.log("Eliminacion")
}

//drop Collection
const dropCollection = (client) => {
  try{
    const result = client.db("Pach_OS").collection("Proveedores").drop()
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
