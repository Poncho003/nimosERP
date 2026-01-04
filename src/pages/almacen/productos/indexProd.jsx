import { useEffect, useState } from "react";
import "../../../assets/css/IndexProd.css";
import { useNavigate, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

const CLASIFICACIONES = [
    "camisas",
    "camisetas",
    "teni",
    "accesorio"
];

export default function Inventario() {

    const [productos, setProductos] = useState([]);
    const [paca, setPaca] = useState([]);
    const [categoriaAbierta, setCategoriaAbierta] = useState(null);

    const navigate = useNavigate();
    const location = useLocation();

    const isActive = (path) =>
        location.pathname === path ? "btn-active" : "";

    /* ================== CARGAR PRODUCTOS ================== */
    useEffect(() => {
        async function cargarProductos() {
            const res = await fetch("http://localhost:3000/api/productos");
            const data = await res.json();
            setProductos(data);
        }
        cargarProductos();
    }, []);

    /* ================== PACA ================== */
    const agregarAPaca = (producto, cantidad) => {
        if (cantidad <= 0) return;

        setPaca(prev => {
            const existe = prev.find(p => p._id === producto._id);

            if (existe) {
                return prev.map(p =>
                    p._id === producto._id
                        ? { ...p, cantidad: p.cantidad + cantidad }
                        : p
                );
            }

            return [...prev, {
                _id: producto._id,
                nombre: producto.nombre,
                precioVenta: producto.precioVenta,
                cantidad
            }];
        });
    };

    const quitarDePaca = (id) => {
        setPaca(prev => prev.filter(p => p._id !== id));
    };

    const total = paca.reduce(
        (sum, p) => sum + p.precioVenta * p.cantidad, 0
    );

    const confirmar = () => {
        if (paca.length === 0) {
            alert("La paca está vacía.");
            return;
        }

        alert("Traspaso confirmado. Total $" + total.toFixed(2));
        setPaca([]);
    };

    /* ================== DRAG & DROP ================== */
    const dragStart = (e, producto, qty) => {
        e.dataTransfer.setData(
            "producto",
            JSON.stringify({ ...producto, qty })
        );
    };

    const dropPaca = (e) => {
        e.preventDefault();
        const data = JSON.parse(e.dataTransfer.getData("producto"));
        agregarAPaca(data, data.qty);
    };

    return (
        <>
            {/* HEADER */}
            <div className="header-fullwide">
                <div className="page-header d-flex justify-content-between align-items-center flex-wrap">
                    <div>
                        <h1 className="page-title">Traspaso a tienda</h1>
                        <p>Organiza productos por categoría y arma la paca.</p>
                    </div>

                    <div className="d-flex gap-2">
                        <button
                            className={`btn-action btn-home ${isActive("/home")}`}
                            onClick={() => navigate("/home")}
                        >
                            <i className="fas fa-house"></i> Inicio
                        </button>

                        <button
                            className={`btn-action btn-almacen ${isActive("/almacen/productos")}`}
                            onClick={() => navigate("/almacen/productos")}
                        >
                            <i className="fas fa-boxes-stacked"></i> Productos
                        </button>
                    </div>
                </div>
            </div>

            {/* CONTENIDO */}
            <div className="inventory-wrapper container">
                <div className="row">

                    {/* INVENTARIO */}
                    <div className="col-lg-8">
                        <h5><i className="fas fa-box"></i> Inventario</h5>

                        {CLASIFICACIONES.map(c => (
                            <div key={c} className="categoria-block">

                                <div
                                    className="categoria-header"
                                    onClick={() =>
                                        setCategoriaAbierta(
                                            categoriaAbierta === c ? null : c
                                        )
                                    }
                                >
                                    <i className={`fas fa-chevron-${categoriaAbierta === c ? "down" : "right"}`}></i>
                                    {c.toUpperCase()}
                                </div>

                                {categoriaAbierta === c && (
                                    productos
                                        .filter(p =>
                                            p.clasificacion?.toLowerCase().includes(c)
                                        )
                                        .map(p => (
                                            <ProductoItem
                                                key={p._id}
                                                producto={p}
                                                dragStart={dragStart}
                                            />
                                        ))
                                )}
                            </div>
                        ))}
                    </div>

                    {/* PACA */}
                    <div className="col-lg-4">
                        <h5><i className="fas fa-boxes-packing"></i> Paca de traspaso</h5>

                        <div
                            className="carrito-drop"
                            onDragOver={(e) => e.preventDefault()}
                            onDrop={dropPaca}
                        >
                            {paca.length === 0 && (
                                <p className="text-muted">Arrastra productos aquí.</p>
                            )}

                            {paca.map(p => (
                                <div key={p._id} className="carrito-item">
                                    <div>
                                        <strong>{p.nombre}</strong><br />
                                        <small>{p.cantidad} × ${p.precioVenta}</small>
                                    </div>

                                    <div className="d-flex gap-2">
                                        <button
                                            className="btn btn-sm btn-outline-primary"
                                            onClick={() => agregarAPaca(p, 1)}
                                        >
                                            ➕
                                        </button>

                                        <button
                                            className="btn btn-sm btn-outline-danger"
                                            onClick={() => quitarDePaca(p._id)}
                                        >
                                            ✕
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <hr />

                        <div className="d-flex justify-content-between fw-bold">
                            <span>Total:</span>
                            <span>${total.toFixed(2)}</span>
                        </div>

                        <button
                            className="btn btn-success w-100 mt-3"
                            onClick={confirmar}
                        >
                            ✅ Confirmar traspaso
                        </button>
                    </div>

                </div>
            </div>
        </>
    );
}

/* ================== ITEM PRODUCTO (SIN BOTÓN ➕) ================== */
function ProductoItem({ producto, dragStart }) {

    const [qty, setQty] = useState(1);

    return (
        <div
            className="producto-card"
            draggable
            onDragStart={(e) => dragStart(e, producto, qty)}
        >
            <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex">
                    <img
                        src={`/productos/${producto.imagen}`}
                        alt={producto.nombre}
                        className="producto-img"
                    />
                    <div>
                        <div className="producto-titulo">{producto.nombre}</div>
                        <div className="producto-meta">
                            Stock {producto.cantidad} · ${producto.precioVenta}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
