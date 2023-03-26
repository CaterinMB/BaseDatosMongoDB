import pymongo
import random
import string

# Conectar a la base de datos en MongoDB Atlas
client = pymongo.MongoClient("mongodb+srv://Pacho:Pacho12314@pach-os.bim9k0o.mongodb.net/test")
db = client.Pach_OS
collection = db.Usuarios

try:
    # La función list_collection_names() lanzará una excepción si no se puede conectar a la base de datos
    collection_names = db.list_collection_names()
    print("La conexión se ha establecido correctamente.")
except pymongo.errors.ConnectionFailure:
    print("La conexión ha fallado.")


nombres = []
i = 1

print("Entrará al for")
for i in range(100):
    
    num_documento = random.randint(1000000000, 9999999999)
    
    nombre = ''.join(random.choices(string.ascii_lowercase, k=8))
    
    while nombre in nombres:
        nombre = ''.join(random.choices(string.ascii_lowercase, k=8))

    nombres.append(nombre)
    
    celular = random.randint(3000000000, 9999999999)    

    correo = nombre + "@gmail.com"
    
    estado = random.choice([True, False])
    
    collection.insert_one({
        "id_Usuario" : i,
        "num_documento" : num_documento,
        "nombre" : nombre,
        "celular" : celular,
        "correo" : correo,
        "estado" : estado
    })
    
print("Se termino la ejecucion")