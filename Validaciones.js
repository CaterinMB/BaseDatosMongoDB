use("Pach-OS");

//---------------------------USUARIOS----------------------------//


db.createCollection("Usuarios", {
    validator : {
        $jsonSchema:{
            bsonType: "object",
            title: "Validacion Usuaios",
            required: [ "id_Usuario", "num_documento", "nombre", "celular", "correo", "estado" ],
            properties : {
                id_Usuario:{
                    bsonType: "int"
                },
                num_documento:{
                    bsonType: "int"
                },
                nombre:{
                    bsonType: "string"
                },
                celular:{
                    bsonType: "int"
                },
                correo:{
                    bsonType : "string"
                },
                estado:{
                    bsonType : "boolean"
                }
            }
        }
    }
})

//---------------------------PROVEEDORES----------------------------//


db.createCollection("Proveedores", {
    validator : {
        $jsonSchema:{
        bsonType: "object",
            title: "Validacion Proveedores",
            required: ["id_Proveedor", "num_documento", "nombre", "celular", "correo", "estado", "insumos_p"],
            properties : {
                id_Proveedor:{
                    bsonType: "int"
                },
                num_documento:{
                    bsonType: "int"
                },
                nombre:{
                    bsonType: "string"
                },
                celular:{
                    bsonType: "int"
                },
                correo:{
                    bsonType : "string"
                },
                estado:{
                    bsonType: "boolean"
                },
                insumos_p:{
                    bsonType : "string"
                }
            }
        }
    }
})

//---------------------------VENTAS----------------------------//


db.createCollection("Ventas", {
    validator : {
        $jsonSchema:{
            bsonType: "object",
            title: "Validacion Ventas",
            required: ["id_Venta", "id_Usuario", "id_Producto", "Fecha", "Cliente", "Total", "Cantidad", "Efectivo"],
            properties : {
                id_Venta:{
                    bsonType: "int"
                },
                id_Usuario:{
                    bsonType: "int"
                },
                id_Producto:{
                    bsonType: "int"
                },
                Fecha:{
                    bsonType: "datetime"
                },
                Cliente:{
                    bsonType : "string"
                },
                Total:{
                    bsonType: "int"
                },
                Cantidad:{
                    bsonType: "int"
                },
                Efectivo:{
                    bsonType : "boolean"
                }
            }
        }
    }
})

//---------------------------PRODUCTOS----------------------------//


db.createCollection("Productos", {
    validator : {
        $jsonSchema:{
            bsonType: "object",
            title: "Validacion Productos",
            required: ["id_Producto", "nom_Producto", "precio_venta", "cant_productos", "estado", "categoria", "insumo"],
            properties : {
                id_Producto:{
                    bsonType: "int"
                },
                nom_Producto:{
                    bsonType: "string"
                },
                precio_venta:{
                    bsonType: "int"
                },
                cant_productos:{
                    bsonType: "int"
                },
                categoria:{
                    bsonType : "string"
                },
                insumos:{
                    bsonType: "string"
                },
                estado:{
                    bsonType : "boolean"
                }
            }
        }
    }
})
