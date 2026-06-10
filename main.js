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
          <td>
            <button
              class="btn btn-primary btn-sm"
              onclick="editarProducto(${producto.id})">
              Editar
            </button>

            <button
              class="btn btn-primary btn-sm"
              onclick="eliminarProducto(${producto.id})">
              Eliminar
            </button>
          </td>
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

      const id = document.getElementById("productoId").value;

      if (id) {

        await fetch(`${API_URL}/${id}`, {

          method: "PUT",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify(producto)

        });

      } else {

        await fetch(API_URL, {

          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify(producto)

        });

      }

      formulario.reset();
      document.getElementById("productoId").value = "";

      cargarProductos();

    } catch(error) {

      console.error(error);

    }

  }
);

async function editarProducto(id) {

  try {

    const respuesta =
      await fetch(`${API_URL}/${id}`);

    const producto =
      await respuesta.json();

    document.getElementById("productoId").value =
      producto.id;

    document.getElementById("nombre").value =
      producto.nombre;

    document.getElementById("precio").value =
      producto.precio;

    document.getElementById("stock").value =
      producto.stock;

  } catch(error) {

    console.error(error);

  }

}

async function eliminarProducto(id) {

  const confirmar =
    confirm("¿Deseas eliminar este producto?");

  if (!confirmar) return;

  try {

    await fetch(`${API_URL}/${id}`, {

      method: "DELETE"

    });

    cargarProductos();

  } catch(error) {

    console.error(error);

  }

}