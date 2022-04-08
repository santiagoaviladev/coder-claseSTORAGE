class Carrito{

    constructor(productos){
        this.productos=productos;
    }

    addProducto(producto)
    {   
    
        //buscarProducto
        // map => [{cantidad:1, producto}] = [producto]
        let mapped= this.productos.map(element=>element.producto);
        
        let enCarrito = mapped.find(element=>element.id===producto.id);

        if(!enCarrito){
            this.productos.push({cantidad:1, producto});
        }  
        else{
            // [producto] => [id]
            let indexed = mapped.map(element=>element.id);
            // [1,2,3,4,5,6] => indexOf(6) => 5
            // ["perro", "gato", "paloma"] =>indexOf("gato") => 1
            // [{id:1, nombre:"hola"}, {id:2, nombre:"bola"}] => indexOf({id:2, nombre:"bola"}) =>-1
            let index = indexed.indexOf(producto.id);
            this.productos[index].cantidad+=1;
        }      
            

        console.log(this.productos);
    }
   
    guardar()
    {
        localStorage.setItem("MI_CARRITO",JSON.stringify(this.productos));
    }




}