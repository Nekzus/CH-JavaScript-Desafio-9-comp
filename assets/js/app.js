//**** DESCRIPCIÓN DE ENTREGA ****/
//** Con base a la primera entrega del proyecto final, se realizan los desafios de la clase 9 (obligatorio y complementario). Se agrego la eliminacion de los productos del carrito mediante botones */
//** de borrado individuales que se vinculan a los items mediante su id. Estos botones son monitoreados mediante un forEach que los recorre y verifica su estado mediante un evento onclick. */
//** Al presionar el borrado se aplico una ventana de mensaje modal reemplazando a la ventana de confirmacion nativa del navegador. */
//** Se agrego la funcionalidad del valor total del carrito, se agrego un campo de alerta bajo el carrito para indicar que esta vacio. Se mejoro la performance gráfica. */


//**** DECLARACION DE VARIABLES GLOBALES ****/
let total= 0; //Variable para el monto total del carrito.
let confirmacion = true; // Confirmacion de Borrado Item. Inicialización.
let cantidad= 0; // Variable para contabilizar la cantidad del mismo item en el carrito .
let codigo = 0; // Inicializo el identificador del item, el cual se incrementara con la creacion de cada objeto(futuro: proxima entrega).
let codigoBorrar = 0; // Variable que almacena el numero de item a borrar ingresado por el usuario. Inicialización.
let carritoProductos = JSON.parse(localStorage.getItem('carritoProductos')) || []; // Array que almacena los items ingresados por el usuario a modo de objetos. Se realiza lectura del array almacenado en localStorage.
let printCarritoHtml = document.getElementById('printHtml');// Referencia variable al cuadro de productos ingresados en el DOM.
let printCarritoVacioHtml = document.getElementById('carrito-vacio');// Referencia variable al cuadro de productos ingresados en el DOM.
let productos; // Variable para insertar el codigo HTML en la tabla.
let itemBorrar; // Variable que contendra el numero de item a borrar.
const btnDeletAll = document.querySelector('#btnDeletAll'); // Como parte de sumar optimizacion al codigo, aplique algo de interaccion con el codigo HTML mediante un boton de borrar todo, y bootstrap.
const btnCarro1 = document.querySelector('#btnCarro1'); // Como parte de sumar optimizacion al codigo, aplique algo de interaccion con el codigo HTML mediante un boton de modificacion de item, y bootstrap.
const btnCarro2 = document.querySelector('#btnCarro2'); // Como parte de sumar optimizacion al codigo, aplique algo de interaccion con el codigo HTML mediante un boton de modificacion de item, y bootstrap.
const btnCarro3 = document.querySelector('#btnCarro3'); // Como parte de sumar optimizacion al codigo, aplique algo de interaccion con el codigo HTML mediante un boton de modificacion de item, y bootstrap.
const btnCarro4 = document.querySelector('#btnCarro4'); // Como parte de sumar optimizacion al codigo, aplique algo de interaccion con el codigo HTML mediante un boton de modificacion de item, y bootstrap.
const montoTotal = document.querySelector('#montoTotal'); // Como parte de sumar optimizacion al codigo, aplique algo de interaccion con el codigo HTML mediante un boton de modificacion de item, y bootstrap.

//**** FUNCION DE IMPRESIÓN ITEMS EN HTML ****//
const imprimirCarritoEnHtml = (item) => {
    printHtml.innerHTML = ""; // Se limpia cuerpo de tabla.
    for(item of item) {
        productos = document.createElement('tr');
        productos.innerHTML = `<th scope="row">${item.titulo}</th>
                                <td>${item.codigo}</td>
                                <td>$${item.precio}</td>
                                <td><button id="${item.codigo}" type="button" class="borrar btn btn-danger">X</button></td>`; // Se agrega botón para eliminar item. Se agrega el codigo del item para su posterior borrado.
        
        printHtml.appendChild(productos);
        borrarItem();
    }
}

//**** FUNCION MONTO TOTAL PRODUCTOS ****//
const montoTotalProductos = () => {
    total = 0;
    for(item of carritoProductos) {
        total += item.precio; //  Se suman los montos en cada iteracion en el carrito.
    }
    return total;
}

montoTotal.innerHTML = ` $${montoTotalProductos()}`; // Se muestra el monto total de los productos en el DOM.

//**** FUNCION BORRADO DE ITEM POR BOTON ****//
const borrarItem = ()=> {
    const btnBorrarItem = document.querySelectorAll('tr button'); // Se seleccionan todos los botones de borrado sobre la el carrito.
    btnBorrarItem.forEach(btn => {   // Se recorren y se escucha si alguno fue pulsado
        btn.onclick = () => {  
            itemBorrar = parseInt(btn.id) // Se reconoce el boton pulsado por su numero de id. Coincidente con el código de producto.
            const confirmacion = new bootstrap.Modal(document.getElementById('ventanaConfirmacion')); // Se asigna el mensaje de confirmacion.
            confirmacion.show(); // Se muestra el mensaje de confirmacion.
            const btnAceptar = document.getElementById('btnAceptar');
            btnAceptar.onclick = () => { // Se escucha si se acepta el mensaje de confirmacion.
            carritoProductos = JSON.parse(localStorage.getItem('carritoProductos')); // Se lee el array almacenado en el localStorage.
            const indexItemBorrar = carritoProductos.findIndex(item => item.codigo === itemBorrar)
            carritoProductos.splice(indexItemBorrar, 1); // Se ejecuta el borrado.
            localStorage.setItem('carritoProductos', JSON.stringify(carritoProductos)); // Se almacena el array con el item borrado. 
            location.reload(); // Se recarga la pagina.
            }    
        }    
    })
}

//**** FUNCION DE FILTRADO TITULO ITEMS ****//
const filtroPorTitulo = (titulo )=> carritoProductos.filter(producto => producto.titulo === titulo); //Filtro de titulo para contabilizar cuantas veces el producto se ingreso al carrito.

imprimirCarritoEnHtml(carritoProductos); // Se imprime en el cuerpo de la tabla HTML los datos guardados en el localStorage.

//**** MENSAJE ALERTA CARRO VACIO ****//
if(carritoProductos.length === 0) { // Se verifica si el carrito esta vacio.
    productos = document.createElement('div');
    productos.innerHTML = `<div class="alert alert-dark text-center" role="alert">Vaya, tu carrito está vacío. Comienza a agregar productos.</div>`;
    printCarritoVacioHtml.appendChild(productos);
}

btnCarro1.addEventListener("click", () => { // Llamado ingreso de items mediante click del boton en el HTML (agregar a carrito).
cantidad = ((filtroPorTitulo('Battlefield 2042')).length) + 1; // Se obtiene la cantidad del producto en el carrito.
const item1 = new Carrito('Battlefield 2042', 1, 2800, cantidad); // Nuevo objeto creado.
ingresoCarrito(item1); // Se ingresa el item al carrito
//             
}); // Cierre alcance ejecución boton de ingreso de item en el HTML.
btnCarro2.addEventListener("click", () => { // Llamado ingreso de items mediante click del boton en el HTML (agregar a carrito).
cantidad = ((filtroPorTitulo('Blue Protocol')).length) + 1; // Se obtiene la cantidad del producto en el carrito.
const item2 = new Carrito('Blue Protocol', 2, 2000, cantidad); // Nuevo objeto creado.
ingresoCarrito(item2); // Se ingresa el item al carrito
//             
}); // Cierre alcance ejecución boton de ingreso de item en el HTML.
btnCarro3.addEventListener("click", () => { // Llamado ingreso de items mediante click del boton en el HTML (agregar a carrito).
cantidad = ((filtroPorTitulo('Halo Infinite')).length) + 1; // Se obtiene la cantidad del producto en el carrito.
const item3 = new Carrito('Halo Infinite', 3, 2500, cantidad); // Nuevo objeto creado.
ingresoCarrito(item3); // Se ingresa el item al carrito
//             
}); // Cierre alcance ejecución boton de ingreso de item en el HTML.
btnCarro4.addEventListener("click", () => { // Llamado ingreso de items mediante click del boton en el HTML (agregar a carrito).
cantidad = ((filtroPorTitulo('Elden Ring')).length) + 1; // Se obtiene la cantidad del producto en el carrito.
const item4 = new Carrito('Elden Ring', 4, 2800, cantidad); // Nuevo objeto creado.
ingresoCarrito(item4); // Se ingresa el item al carrito
//             
}); // Cierre alcance ejecución boton de ingreso de item en el HTML.

const ingresoCarrito = (item) => { // Funcion de ingreso de item al carrito.
carritoProductos.push(item);
localStorage.setItem('carritoProductos', JSON.stringify(carritoProductos)); // Se almacena en el localStorage el nuevo objeto-item creado.
location.reload(); // Se refresca el navegador para que se muestren los cambios.

}

//**** OBJECT CONSTRUCTOR ****//
class Carrito {
    constructor(titulo, codigo, precio, cantidad) { // Recibe los datos.
        this.titulo = titulo;
        this.codigo = codigo;
        this.precio = precio;
        this.cantidad = cantidad;
    }  
}

//**** MODO MODIFICACIÓN: BORRADO DE TODOS LOS ITEMS ****/
btnDeletAll.addEventListener("click", () => { // Llamado borrado de todos los items mediante click del boton en el HTML.
    if(carritoProductos.length >0) {
            carritoProductos = [];
            localStorage.clear();
            location.reload(); // Se recarga la pagina.
        }
    
}); // Cierre alcance ejecución boton de borrado de todos los items en el HTML.

