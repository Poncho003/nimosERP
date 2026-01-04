import { useNavigate } from "react-router-dom";
import "../../../assets/css/EstadisticasProductos.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

export default function EstadisticasProductos() {

    const navigate = useNavigate();

    return (
        <div className="page-layout">
            {/* HEADER */}
            <div className="header-fullwide">
                <div className="page-header d-flex justify-content-between align-items-center">

                    <div>
                        <h1 className="page-title">Estadísticas de productos</h1>
                        <p>Resumen visual del inventario del almacén</p>
                    </div>

                    <button
                        className="btn-action"
                        onClick={() => navigate("/almacen/productos")}
                    >
                        <i className="fas fa-arrow-left"></i>
                        Volver
                    </button>

                </div>
            </div>

            {/* CONTENIDO */}
            <div className="stats-page">

                {/* RESUMEN */}
                <div className="stats-grid">

                    <div className="stat-card blue">
                        <i className="fas fa-boxes-stacked"></i>
                        <h2>3</h2>
                        <span>Productos totales</span>
                    </div>

                    <div className="stat-card green">
                        <i className="fas fa-circle-check"></i>
                        <h2>2</h2>
                        <span>Productos activos</span>
                    </div>

                    <div className="stat-card red">
                        <i className="fas fa-triangle-exclamation"></i>
                        <h2>1</h2>
                        <span>Pendientes de eliminar</span>
                    </div>

                    <div className="stat-card purple">
                        <i className="fas fa-store"></i>
                        <h2>2</h2>
                        <span>Sucursales</span>
                    </div>

                </div>

                {/* DISTRIBUCIÓN */}
                <div className="stats-section">
                    <h3>Distribución por categoría</h3>

                    <div className="fake-bars">
                        <div><span>Camisas</span><div className="bar w60"></div></div>
                        <div><span>Accesorios</span><div className="bar w30"></div></div>
                        <div><span>Zapatos</span><div className="bar w40"></div></div>
                    </div>
                </div>

                <div className="stats-section">
                    <h3>Distribución por marca</h3>

                    <div className="fake-bars">
                        <div><span>Nike</span><div className="bar w50"></div></div>
                        <div><span>Adidas</span><div className="bar w30"></div></div>
                        <div><span>Puma</span><div className="bar w20"></div></div>
                    </div>
                </div>

            </div>

            {/* Footer */}
            <div className="footer">
                <div className="footer-content">
                    <p>Sistema de Inventario © Ponchis 2025</p>
                </div>
            </div>
        </div>
    );
}
