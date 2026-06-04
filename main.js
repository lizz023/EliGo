const API_URL = "https://eligo-m3fs.onrender.com/productos";

const tablaProductos =
  document.getElementById("tablaProductos");

const formulario =
  document.getElementById("productoForm");

document.addEventListener(
  "DOMContentLoaded",
  cargarProductos
);

async function cargarProductos() {

  try {

    const respuesta =
      await fetch(API_URL);

    const data =
      await respuesta.json();

    tablaProductos.innerHTML = "";

    data.productos.forEach(producto => {

      tablaProductos.innerHTML += `
        <tr>
          <td>${producto.id}</td>
          <td>${producto.nombre}</td>
          <td>$${producto.precio}</td>
          <td>${producto.stock}</td>
        </tr>
      `;

    });

  } catch(error) {

    console.error(
      "Error al cargar productos:",
      error
    );

  }

}

formulario.addEventListener(
  "submit",
  async (e) => {

    e.preventDefault();

    const producto = {

      nombre:
        document.getElementById("nombre").value,

      precio:
        Number(
          document.getElementById("precio").value
        ),

      stock:
        Number(
          document.getElementById("stock").value
        )

    };

    try {

      await fetch(API_URL, {

        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify(producto)

      });

      formulario.reset();

      cargarProductos();

    } catch(error) {

      console.error(error);

    }

  }
);