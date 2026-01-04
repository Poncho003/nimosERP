import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "../../../assets/css/VerProductos.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import nikeLogo from "../../../assets/brands/nike.png";
import adidasLogo from "../../../assets/brands/adidas.png";
import pumaLogo from "../../../assets/brands/puma.png";
import oncloudLogo from "../../../assets/brands/oncloud.png";

export default function VerProductos() {
    const navigate = useNavigate();
    const [productoEditando, setProductoEditando] = useState(null);
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [marcaActiva, setMarcaActiva] = useState(null);
    const [categoriaActiva, setCategoriaActiva] = useState(null);
    const CLASIFICACIONES = [
        { key: "Camisas", value: "camisas", icon: "tshirt", color: "#3498db" },
        { key: "Camisetas", value: "camiseta", icon: "tshirt", color: "#9b59b6" },
        { key: "Tenis", value: "tenis", icon: "running", color: "#2ecc71" },
        { key: "Accesorios", value: "accesorio", icon: "shopping-bag", color: "#f1c40f" },
    ];

    const cargarProductos = async (categoria, marca) => {
        setLoading(true);
        try {
            let url = `http://localhost:3000/api/productos?clasificacion=${categoria}`;

            if (marca) {
                url += `&marca=${marca}`;
            }

            const res = await fetch(url);
            const data = await res.json();
            setProductos(data);
        } catch (err) {
            console.error("Error cargando productos:", err);
        } finally {
            setLoading(false);
        }
    };


    const MARCAS = [
        { key: "Nike", value: "Nike", img: nikeLogo },
        { key: "Adidas", value: "Adidas", img: adidasLogo },
        { key: "Puma", value: "Puma", img: pumaLogo },
        { key: "On Cloud", value: "On Cloud", img: oncloudLogo },
    ];

    return (
        <>
            {/* HEADER FULL WIDTH */}
            <div className="header-fullwide">
                <div className="page-header d-flex justify-content-between align-items-center flex-wrap">

                    <div>
                        <h1 className="page-title">Ver productos</h1>
                        <p>Elige una categoría para continuar</p>
                    </div>

                    <div className="mt-3 mt-md-0 d-flex gap-2">

                        <button
                            className="btn-action btn-envios"
                            onClick={() => navigate("/almacen/productos")}
                        >
                            <i className="fas fa-boxes-stacked"></i>
                            Mis productos
                        </button>
                    </div>
                </div>
            </div>

            {/* CONTENIDO VER PRODUCTOS */}
            <div className="ver-productos-wrapper">

                {/* ================= VISTA CATEGORÍAS ================= */}
                {!categoriaActiva && (
                    <div className="clasificaciones-container">
                        <div className="clasificaciones-grid">
                            {CLASIFICACIONES.map(c => (
                                <button
                                    key={c.key}
                                    className="clasificacion-card"
                                    onClick={() => {
                                        setCategoriaActiva(c);
                                        setMarcaActiva(null);
                                        setProductos([]);
                                    }}
                                    style={{ borderLeft: `10px solid ${c.color}` }}
                                >
                                    <div className="icon-box" style={{ background: c.color }}>
                                        <i className={`fas fa-${c.icon}`}></i>
                                    </div>
                                    <span className="label">{c.key}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* ================= VISTA MARCAS ================= */}
                {categoriaActiva && !marcaActiva && (
                    <div style={{ marginTop: 30 }}>
                        <h2 style={{ textAlign: "center", fontSize: "2rem" }}>
                            {categoriaActiva.key}
                        </h2>

                        <p style={{ textAlign: "center", fontSize: "1.2rem" }}>
                            Selecciona una marca
                        </p>

                        <div className="marcas-grid">
                            {MARCAS.map(m => (
                                <button
                                    key={m.key}
                                    className="marca-card"
                                    onClick={() => {
                                        setMarcaActiva(m.value);
                                        cargarProductos(categoriaActiva.value, m.value);
                                    }}
                                >
                                    <img src={m.img} alt={m.key} />
                                    <span>{m.key}</span>
                                </button>
                            ))}
                        </div>

                        <button
                            className="btn-action"
                            style={{ margin: "30px auto", display: "block" }}
                            onClick={() => {
                                setCategoriaActiva(null);
                                setMarcaActiva(null);
                                setProductos([]);
                            }}
                        >
                            ⬅ Volver a categorías
                        </button>
                    </div>
                )}

                {/* ================= VISTA PRODUCTOS ================= */}
                {categoriaActiva && marcaActiva && (
                    <div style={{ marginTop: 30 }}>
                        <h2 style={{ textAlign: "center", fontSize: "2rem" }}>
                            {categoriaActiva.key} · {marcaActiva}
                        </h2>

                        {loading && (
                            <p style={{ textAlign: "center" }}>Cargando productos…</p>
                        )}

                        {!loading && productos.length === 0 && (
                            <p style={{ textAlign: "center", fontSize: "1.2rem" }}>
                                No hay productos para esta marca
                            </p>
                        )}

                        <div className="productos-grid">
                            {productos.map(p =>
                                productoEditando === p._id ? (

                                    /* ===== MODO EDICIÓN ===== */
                                    <div key={p._id} className="producto-card editando">

                                        <input
                                            className="edit-input"
                                            value={p.nombre}
                                            onChange={e =>
                                                setProductos(prev =>
                                                    prev.map(prod =>
                                                        prod._id === p._id
                                                            ? { ...prod, nombre: e.target.value }
                                                            : prod
                                                    )
                                                )
                                            }
                                        />

                                        <input
                                            type="number"
                                            className="edit-input"
                                            value={p.cantidad}
                                            onChange={e =>
                                                setProductos(prev =>
                                                    prev.map(prod =>
                                                        prod._id === p._id
                                                            ? { ...prod, cantidad: e.target.value }
                                                            : prod
                                                    )
                                                )
                                            }
                                        />

                                        <div className="producto-actions">
                                            <button
                                                className="btn-edit"
                                                onClick={async () => {
                                                    await fetch(`http://localhost:3000/api/productos/${p._id}`, {
                                                        method: "PUT",
                                                        headers: { "Content-Type": "application/json" },
                                                        body: JSON.stringify(p)
                                                    });
                                                    setProductoEditando(null);
                                                }}
                                            >
                                                💾 Guardar
                                            </button>

                                            <button
                                                className="btn-delete"
                                                onClick={() => setProductoEditando(null)}
                                            >
                                                ❌ Cancelar
                                            </button>
                                        </div>
                                    </div>

                                ) : (

                                    /* ===== MODO VISTA ===== */
                                    <div key={p._id} className="producto-card">

                                        <div className="producto-head">
                                            <img
                                                className="producto-img"
                                                src={`/productos/${p.imagen}`}
                                                alt={p.nombre}
                                            />

                                            <div className="producto-info">
                                                <h3>{p.nombre}</h3>
                                                <p>Stock: <b>{p.cantidad}</b></p>
                                            </div>
                                        </div>


                                        <div className="producto-actions">
                                            <button
                                                className="btn-edit"
                                                onClick={() => setProductoEditando(p._id)}
                                            >
                                                ✏️ Editar
                                            </button>

                                            <button
                                                className="btn-delete"
                                                onClick={async () => {
                                                    const ok = window.confirm(
                                                        "¿Seguro?\nEl producto se enviará a revisión."
                                                    );
                                                    if (!ok) return;

                                                    await fetch(
                                                        `http://localhost:3000/api/productos/${p._id}/marcar-eliminar`,
                                                        { method: "PUT" }
                                                    );

                                                    setProductos(prev =>
                                                        prev.map(prod =>
                                                            prod._id === p._id
                                                                ? { ...prod, estado: "PENDIENTE_ELIMINAR" }
                                                                : prod
                                                        )
                                                    );
                                                }}>
                                                🗑️ Eliminar
                                            </button>
                                        </div>
                                    </div>

                                )
                            )}
                        </div>


                        <div className="nav-actions">
                            <button
                                className="btn-action btn-soft"
                                onClick={() => { setMarcaActiva(null); setProductos([]); }}
                            >
                                ⬅ Cambiar marca
                            </button>

                            <button
                                className="btn-action btn-soft"
                                onClick={() => { setCategoriaActiva(null); setMarcaActiva(null); setProductos([]); }}
                            >
                                ⬅ Categorías
                            </button>
                        </div>

                    </div>
                )}

            </div>

        </>
    );
}
