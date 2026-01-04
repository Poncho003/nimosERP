import { useNavigate, useLocation } from "react-router-dom";
import "../../../assets/css/IndexProd.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

export default function ProductosAlmacen() {

    const navigate = useNavigate();
    const location = useLocation();
    const ADMIN_PASSWORD = "admin123";
    const isActive = (path) =>
        location.pathname === path ? "btn-active" : "";

    const accesoEliminar = () => {
        const pass = window.prompt("Ingresa la contraseña de administrador");

        if (!pass) return;

        if (pass === ADMIN_PASSWORD) {
            navigate("/almacen/productos/eliminar");
        } else {
            alert("❌ No tienes permiso para acceder a esta sección");
        }
    };

    return (
        <>
            {/* HEADER FULL WIDTH */}
            <div className="header-fullwide">
                <div className="page-header d-flex justify-content-between align-items-center flex-wrap">

                    <div>
                        <h1 className="page-title">Recepción de mercancía</h1>
                        <p>Navega entre productos y movimientos sin salir del flujo.</p>
                    </div>

                    <div className="mt-3 mt-md-0 d-flex gap-2">

                        <button
                            className={`btn-action btn-home ${isActive("/home")}`}
                            onClick={() => navigate("/home")}
                        >
                            <i className="fas fa-house"></i>
                            Inicio
                        </button>

                        <button
                            className={`btn-action btn-envios ${isActive("/almacen/movimientos")}`}
                            onClick={() => navigate("/almacen/movimientos")}
                        >
                            <i className="fas fa-arrows-rotate"></i>
                            Movimientos
                        </button>

                    </div>
                </div>
            </div>

            {/* PANEL VISUAL */}
            <div className="crud-grid">

                <div className="crud-card" onClick={() => navigate("/almacen/productos/nuevo")}>
                    <i className="fas fa-circle-plus"></i>
                    <span>Agregar producto</span>
                </div>

                <div className="crud-card" onClick={() => navigate("/almacen/bodega/ver-productos")}>
                    <i className="fas fa-box-open"></i>
                    <span>Ver productos</span>
                </div>

                <div className="crud-card" onClick={() => navigate("/almacen/productos/estadisticas")}>
                    <i className="fas fa-chart-column"></i>
                    <span>Estadísticas de productos</span>
                </div>


                <div className="crud-card danger" onClick={accesoEliminar}>
                    <i className="fas fa-trash"></i>
                    <span>Eliminar productos</span>
                </div>

            </div>
        </>
    );
}
