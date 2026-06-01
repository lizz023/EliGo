const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware: habilita leer body en formato JSON
// Sin esta línea, req.body siempre será undefined

app.use(express.json());

let inventario = [
{ id: 1, nombre: 'MacBook Pro', precio: 2500, stock: 5 },
{ id: 2, nombre: 'Monitor 4K', precio: 800, stock: 12 },
{ id: 3, nombre: 'Teclado SENA', precio: 45, stock: 30 },
];

// Listar productos del inventario
app.get('/productos', (req, res) => {
    const valorTotal = inventario.reduce(
        (acc, p) => acc + p.precio * p.stock, 
        0
    );
    res.json({
        total: inventario.length,
        valorTotal,
        productos: inventario,
    });
});

// Obtener un producto con un id especfico
app.get('/productos/:id', (req, res) => {
    const id = Number(req.params.id); // params siempre llega como string
    const producto = inventario.find(p => p.id === id);
    if (!producto) {
    // 404 = 'No encontrado'
        return res.status(404).json({
            error: `No existe producto con ID ${id}`,
        });
    }
    res.json(producto);
});

// Agregar un producto nuevo
app.post('/productos', (req, res) => {
    const { nombre, precio, stock } = req.body;
    // Validación: si falta algún campo, rechazar con error 400
    if (!nombre || precio === undefined || stock === undefined) {
        return res.status(400).json({
            error: 'Faltan campos requeridos: nombre, precio, stock',
        });
    }
    const nuevo = {
        id: Date.now(), // ID único basado en timestamp
        nombre,
        precio: Number(precio),
        stock: Number(stock),
    };
    // Inmutable: spread en lugar de push()
    inventario = [...inventario, nuevo];
    // 201 = 'Creado exitosamente'
    res.status(201).json({
        mensaje: `'${nuevo.nombre}' agregado correctamente`,
        producto: nuevo,
    });
});

// UPDATE — Actualizar uno o varios campos de un producto
app.put('/productos/:id', (req, res) => {
    const id = Number(req.params.id);
    const cambios = req.body;
    const existe = inventario.find(p => p.id === id);

    if (!existe) {
        return res.status(404).json({ error: `ID ${id} no encontrado` });
    }
    // Inmutable: map + spread en lugar de bucle for
    inventario = inventario.map(p =>
        p.id === id
            ? { ...p, ...cambios, id } // fusionar cambios, id no cambia
            : p
    );
    const actualizado = inventario.find(p => p.id === id);
    res.json({
        mensaje: `Producto ID ${id} actualizado correctamente`,
        producto: actualizado,
    });
});

// DELETE — Eliminar un producto por ID
app.delete('/productos/:id', (req, res) => {
    const id = Number(req.params.id);
    const existe = inventario.find(p => p.id === id);
    if (!existe) {
        return res.status(404).json({ error: `ID ${id} no encontrado` });   
    }
    // Inmutable: filter en lugar de splice()
    inventario = inventario.filter(p => p.id !== id);
    res.json({
        mensaje: `'${existe.nombre}' eliminado correctamente`,
        eliminado: existe,
    });
});

app.listen(PORT, () => {
console.log(`Servidor en http://localhost:${PORT}`);
});