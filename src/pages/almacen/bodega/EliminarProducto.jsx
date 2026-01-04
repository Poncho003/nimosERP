import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../../../assets/css/EliminarProducto.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

export default function EliminarProducto() {

    const navigate = useNavigate();
    const location = useLocation();

    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);

    const isActive = (path) =>
        location.pathname === path ? "btn-active" : "";

    const cargarPendientes = async () => {
        try {
            const res = await fetch("http://localhost:3000/api/productos");
            const data = await res.json();

            const pendientes = data.filter(
                p => p.estado === "PENDIENTE_ELIMINAR"
            );

            setProductos(pendientes);
        } catch (err) {
            console.error("Error cargando productos:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        cargarPendientes();
    }, []);

    // ELIMINAR DEFINITIVO
    const eliminarDefinitivo = async (id) => {
        const ok = window.confirm(
            "⚠️ Este producto se eliminará permanentemente.\n¿Deseas continuar?"
        );
        if (!ok) return;

        await fetch(`http://localhost:3000/api/productos/${id}`, {
            method: "DELETE"
        });

        setProductos(prev => prev.filter(p => p._id !== id));
    };

    // CANCELAR ELIMINACIÓN
    const cancelarEliminacion = async (id) => {
        await fetch(`http://localhost:3000/api/productos/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ estado: "ACTIVO" })
        });

        setProductos(prev => prev.filter(p => p._id !== id));
    };

    return (
        <>
            {/* HEADER FULL WIDTH */}
            <div className="header-fullwide danger-header">
                <div className="page-header d-flex justify-content-between align-items-center flex-wrap">

                    <div>
                        <h1 className="page-title">
                            Eliminar productos
                        </h1>
                        <p>
                            Confirma o cancela productos marcados para eliminación.
                        </p>
                    </div>

                    <div className="mt-3 mt-md-0 d-flex gap-2">
                        <button
                            className="btn-action btn-danger"
                            onClick={() => navigate("/almacen/productos")}
                        >
                            <i className="fas fa-arrow-left"></i>
                            Salir
                        </button>

                    </div>
                </div>
            </div>

            {/* CONTENIDO */}
            <div className="page-eliminar-producto">
                <div className="eliminar-wrapper">

                    {loading && (
                        <p style={{ textAlign: "center" }}>
                            Cargando productos pendientes...
                        </p>
                    )}

                    {!loading && productos.length === 0 && (
                        <div className="eliminar-empty">
                            No hay productos pendientes de eliminación
                        </div>
                    )}

                    {productos.map(p => (
                        <div key={p._id} className="eliminar-card">

                            <div className="eliminar-info">
                                <h3>{p.nombre}</h3>
                                <span>Stock: {p.cantidad}</span>
                                <span>Sucursal: {p.sucursal}</span>
                                <span className="badge-pendiente">
                                    PENDIENTE DE ELIMINAR
                                </span>
                            </div>

                            <div className="eliminar-actions">
                                <button
                                    className="btn-confirmar"
                                    onClick={() => eliminarDefinitivo(p._id)}
                                >
                                    <i className="fas fa-trash"></i> Eliminar
                                </button>

                                <button
                                    className="btn-cancelar"
                                    onClick={() => cancelarEliminacion(p._id)}
                                >
                                    <i className="fas fa-check"></i> No eliminar
                                </button>
                            </div>

                        </div>
                    ))}

                </div>
            </div>
        </>
    );
}