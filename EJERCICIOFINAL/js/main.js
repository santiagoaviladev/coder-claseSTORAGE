
/* 1. 

    Agregue la funcionalidad al botón 'Agregar Producto' 
    Ese botón debe agregar el producto al carrito y actualizar la vista 
    Igualmente, debe almacenar en el storage el carrito para el usuario actual

    El carrito debe mostrar el total (reduce)
    

   2. 
    Modifique el programa, para que una vez se carguen la página, se precargue el carrito existente, en caso de haber alguno

*/

//const data = JSON.parse(localStorage.getItem("MI_CARRITO"));
miCarrito= new Carrito([]);
/*
if(!miCarrito)
{
  miCarrito= new Carrito([]);
}
else{
  miCarrito= new Carrito(data);
}
*/
//console.log(miCarrito.productos.reduce((acc,element)=>acc+=element.precio,0));


function init(){
    escribirBienvenida();
    mostrarMenu();
    escribirMensaje();
}

function escribirBienvenida()
{
  const myH1 = document.createElement("h1");
  myH1.innerHTML="Bienvenido";
  document.body.appendChild(myH1);

}

function mostrarMenu()
{
   categorias.forEach((categoria)=>{
     const myBtn = document.createElement("button");
     myBtn.setAttribute("class", "styledBtn");
     myBtn.innerHTML=categoria.nombre;
     myBtn.addEventListener("click", ()=>mostrarProductos(categoria));
     document.body.appendChild(myBtn);
   })
}

function escribirMensaje()
{
  const nodoMensaje = document.createElement("p");
  nodoMensaje.setAttribute("id", "mainMessage");
  nodoMensaje.innerHTML= "Por favor, selecciona una categoría para continuar:";
  document.body.appendChild(nodoMensaje);
}


function mostrarProductos(categoria)
{
  
  // Filtrar los productos de la categoria
  // Mostrar los productos
  document.querySelector("#mainMessage").innerHTML=`<h3>Productos en Categoría: ${categoria.nombre}</h3>`
  const productosFiltrados = filtrarProductos(categoria.id);
  
  let contenedor = document.getElementById("mainContainer");
  if(contenedor===null)
  {
    contenedor = document.createElement("div");
    contenedor.setAttribute("id", "mainContainer");
    document.body.appendChild(contenedor);
  }
  
  let nodoProductos = document.getElementById("productos");
  if(nodoProductos===null)
  {
    nodoProductos = document.createElement("div");
    nodoProductos.setAttribute("id", "productos");
    contenedor.appendChild(nodoProductos);
  }
  else 
  {
    nodoProductos.innerHTML="";
  }
 
  

  let cadena ='';
  productosFiltrados.forEach((element)=>{
    cadena+=getProductInfo(element);
    nodoProductos.innerHTML=cadena;
  });

  mostrarCarrito();



}

function filtrarProductos(idCategoria)
{

    return productos.filter(producto=>producto.categoria===idCategoria);

}


function getProductInfo(product)
{
  return `<div class="productWrapper">
        <div class="mainProductInfo">
          <div class="productImage">
            <img src="${product.img}">
          </div>
          <div class="productInfo">
            ${product.nombre}<br>
            $${product.precio}
          </div>
          </div>
          <div class="productBtn">
            ${getProductButton(product)}
          </div>
          </div>`


}

function getProductButton(product)
{
    if(product.stock>0)
    {
      return `<button class="styledBtn" onclick="agregarAlCarrito(${product.id})">Agregar al Carrito</button>`
    }
    else{
      return `<button class="notBuyBtn">No Disponible</button>`;
    }
}

function agregarAlCarrito(productId)
{
  let products = productos.map(el=>el.id);
  let index = products.findIndex(el=>el===productId);
  let product = productos[index];
  miCarrito.addProducto(product);
  actualizarCarrito();


}

function actualizarCarrito()
{
  let contenedor = document.getElementById("carrito");
  contenedor.innerHTML="";
  let prods = miCarrito.productos;
  let nuevoContenedor=document.createElement("div");
  nuevoContenedor.setAttribute("style", "display:flex;flex-direction:column");
  prods.forEach(producto=>{
    let nodoLi = document.createElement("div");
    nodoLi.innerHTML=`${producto.nombre} - ${producto.precio}<br>`
    nuevoContenedor.appendChild(nodoLi)
    
  })

  contenedor.appendChild(nuevoContenedor);
  
  miCarrito.guardar();


}

function mostrarCarrito()
{
  let contenedor = document.getElementById("mainContainer");
  let nodoCarrito = document.getElementById("carrito");
  if(nodoCarrito===null)
  {
    nodoCarrito = document.createElement("div");
    nodoCarrito.setAttribute("id", "carrito");
    nodoCarrito.innerHTML="<h3>Su Carrito:</h3>";
    contenedor.appendChild(nodoCarrito);
  }
  actualizarCarrito();

  
}