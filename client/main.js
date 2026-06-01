

let opcionUsuario;
let categoriaSeleccionada;
let mensajeResultado;



let x;
let dato;

function getUserSelection() {
  // obtiene opción del usuario
}

function showResult() {
  // muestra resultado en pantalla
}

const botonIniciar = document.getElementById("btnIniciar"); 

const contenedorResultado = document.getElementById("resultado");

function iniciarAplicacion() { 
  let opcion = obtenerSeleccionUsuario(); 
  mostrarResultado(opcion); 
}

// Verifica que el usuario haya seleccionado una opción 
if (opcionUsuario !== ""){ 
    mostrarResultado(); 
}

if (!opcionUsuario){ 
  alert("Por favor selecciona una opción"); 
}

const botonOpcion = document.getElementById("btnOpcion"); 

botonOpcion.addEventListener("click", function (){

   let opcionUsuario = document.getElementById("entradaOpcion").value; 
   
   if (!opcionUsuario){ 
      alert("Debes ingresar una opción"); 
      return; 
    } 
    
    mostrarResultado(opcionUsuario); 
}); 
    
function mostrarResultado(opcion){ 
  const resultado = document.getElementById("resultado"); 
  resultado.textContent = "Seleccionaste: " + opcion; 
}