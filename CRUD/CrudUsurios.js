//-------------USUARIOS----------------//

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
      "id_Usuario" : 101,
      "num_documento" : 1000307260,
      "nombre" : "Karen",
      "celular" : 3005602749,
      "correo" : "Karen@gmail.com",
      "estado" : true
    });

    //insertmany
    await CreateMany(client,[{
      "id_Usuario" : 102,
      "num_documento" : 1000765433,
      "nombre" : "Miguel",
      "celular" : 3002902549,
      "correo" : "Miguel@gmail.com",
      "estado" : true
    },
    {
      "id_Usuario" : 103,
      "num_documento" : 1000738483,
      "nombre" : "Andres",
      "celular" : 3014952057,
      "correo" : "Andres@gmail.com",
      "estado" : false
    },
    {
      "id_Usuario" : 104,
      "num_documento" : 1000583046,
      "nombre" : "Caterin",
      "celular" : 3005602873,
      "correo" : "Caterin@gmail.com",
      "estado" : true
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
async function Createone(client , usuario){
  await client.db("Pach_OS").collection("Usuarios").insertOne(usuario);
  console.log("usuario Registrada Exitosamente");
}

//insertmany
async function CreateMany(client, usuarios){
  await client.db("Pach_OS").collection("Usuarios").insertMany(usuarios);
  console.log("Usuarios Registradas Exitosamente");
}


/////////////***** Read ******////////////////

//Findone
async function FindOne(client){
 const query = {id_usuario: 36}
 const  result = await client.db("Pach_OS").collection("Usuarios").findOne(query);
 console.log(result)
}

//Find and Example Limit
async function buscar(client){
 const query = {nombre: 'Karen'}
 const  result = await client.db("Pach_OS").collection("Usuarios").find(query).limit(3).toArray();
 console.log(result)
}


/////////////***** Update *******//////////////////////

//Updateone
async function ActualizarUno(client){
 const query ={id_usuario: 94};
 const result = await client.db("Pach_OS").collection("Usuarios").updateOne(query,{$set:{celular: 3014684752}});
 console.log("usuario Actualizada")
}


//Updateone with ##upsert##
async function ActualizarUno(client){
 const query ={id_usuario: 28};
 const X = await client.db("Pach_OS").collection("Usuarios").updateOne(query,{$set:{nombre: "Jose"}}, {upsert:true} );
 console.log(X)
 console.log("usuario Actualizada")
}

//UpdateMany
async function ActualizarVarios(client){
 const query = {nombre: "Jose"}
 const  X = await client.db("Pach_OS").collection("Usuarios").updateMany(query,{$set: {celular: 3012029509}});
 console.log("usuario Actualizada")
 console.log(X)
}

/////////////***** Delete *********///////////////
//Deleteone
async function borraruno(client){
 const query={id_usuario: 93};
 const X =await client.db("Pach_OS").collection("Usuarios").deleteOne(query);
 console.log(X);
 console.log("Eliminado")
}

//DeleteMany
async function borrarvarios(client){
 const query={nombre: "Andres"};
 const X =await client.db("Pach_OS").collection("Usuarios").deleteMany(query);
 console.log(X);
 console.log("Eliminacion")
}

//drop Collection
const dropCollection = (client) => {
   try{
       const result = client.db("Pach_OS").collection("Usuarios").drop()
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