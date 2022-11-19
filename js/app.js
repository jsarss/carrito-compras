const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaCurso = document.querySelector('#lista-cursos');
let articulosCarrito = [];


cargarEventListeners()
function cargarEventListeners (){
    //Cuando agregas un curso presionando "Agregar carrito"
   listaCurso.addEventListener('click', agregarCurso);

   //Elimina cursos del carrito
   carrito.addEventListener('click', borrarCurso);
   
   //vaciar carrito

   vaciarCarritoBtn.addEventListener('click', ()=>{
    articulosCarrito = [];//reseteamos el arreglo
    limpiarHTML();//eliminamos el html
   })
}

//funciones

function agregarCurso(e){
    e.preventDefault();
    if(e.target.classList.contains('agregar-carrito')){
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCursos(cursoSeleccionado)
    }
    
}

//Elimina un curso del carrito
 function borrarCurso(e){
  if(e.target.classList.contains('borrar-curso')){
    const cursoId = e.target.getAttribute('data-id');

    //Elimina del arreglo articulosCarrito por el data-id
    articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId);
    carritoHTML ();
  }
  
 }


//Lee el contenido deñ HTML al que le dimos click y extrae la informacion del curso
function leerDatosCursos(curso){
//    console.log(curso);

   //Crear un objeto con el contenido del curso actual
const infoCurso = {
    imagen: curso.querySelector('img').src,
    titulo: curso.querySelector('h4').textContent,
    precio: curso.querySelector('.precio span').textContent,
    id: curso.querySelector('a').getAttribute('data-id'),
    cantidad: 1
   }
 //Revisa si un elemento ya existe en el carrito
 const existe = articulosCarrito.some(curso => curso.id === infoCurso.id);
 if(existe){
  const curso = articulosCarrito.map(curso =>{
    if(curso.id === infoCurso.id){
      curso.cantidad ++;
      return curso;// retorna el objeto actualizado
    }else{
      return curso;// retorna los objetos q no son duplicados
    }
  });
  articulosCarrito = [...curso];

 }else{
    articulosCarrito = [...articulosCarrito, infoCurso];
 }

  //Agrega elementos al arreglo de carrito
  
  console.log(articulosCarrito);

  carritoHTML()


}

//muestra el carrito de compras en el html

function carritoHTML (){
   //limpiar html
     limpiarHTML()

   //recorre el carrito y genera el HTML
     articulosCarrito.forEach(curso=>{
        const {imagen, titulo, precio, cantidad, id} = curso;
        const row = document.createElement('tr');
        row.innerHTML= `
            <td>
              <img src ="${imagen}" width="100">
            </td>
            <td>${titulo}</td>
            <td>${precio}</td>
            <td>${cantidad}</td>
            <td>
               <a href='#' class='borrar-curso' data-id='${id}'>X</a>
            </td>
        
        `;
        //Agrega el html del carrito en el tbody
        contenedorCarrito.appendChild(row)


    })
}

//Elimina los cursos del tbody
function limpiarHTML(){
    //forma lenta
    //contenedorCarrito.innerHTML = '';
    
    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)

    }
 
}
