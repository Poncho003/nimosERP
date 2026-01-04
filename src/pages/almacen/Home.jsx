import "../../assets/css/Home.css";
import { useNavigate } from "react-router-dom";

export default function Home() {
    const navigate = useNavigate();

    return (
        <div className="home-wrapper">
            {/* Header */}
            <header className="main-header">
                <div className="main-header-content">
                    <div className="logo">
                        <div className="logo-icon">
                            <i className="fas fa-warehouse"></i>
                        </div>
                        <div className="logo-text">Sistema de Inventario</div>
                    </div>

                    <div className="user-info">
                        <div className="user-avatar">
                            <i className="fas fa-user-gear"></i>
                        </div>
                        <div className="user-name">User</div>

                        <button
                            className="logout-btn"
                            onClick={() => {
                                const salir = window.confirm("¿Deseas cerrar sesión?\nPerderás tu sesión activa.");
                                if (salir) navigate("/");
                            }}
                        >
                            <i className="fas fa-right-from-bracket"></i>
                            Cerrar sesión
                        </button>

                    </div>
                </div>
            </header>

            {/* Main */}
            <main className="container main-container">
                <section className="hero">
                    <h1 className="hero-title">¡Bienvenido al Sistema de Inventario!</h1>
                    <p className="hero-subtitle">
                        Gestiona tu inventario y controla tus productos y envíos fácilmente desde una sola plataforma.
                    </p>
                </section>

                <section className="actions-grid">
                    {/* Card 1 — PRODUCTOS */}
                    <div className="action-card">
                        <div className="card-icon">
                            <i className="fas fa-boxes-stacked"></i>
                        </div>
                        <h3 className="card-title">Inventario Principal</h3>
                        <p className="card-description">
                            Registra nuevos productos, edita precios y controla las existencias de tu bodega de forma visual y sencilla.
                        </p>

                        <button
                            className="btn-action btn-almacen"
                            onClick={() => navigate("/almacen/productos")}
                        >
                            <i className="fas fa-arrow-right"></i> Gestionar Acciones para Productos
                        </button>
                    </div>

                    {/* Card 2 — MOVIMIENTOS */}
                    <div className="action-card">
                        <div className="card-icon">
                            <i className="fas fa-arrows-rotate"></i>
                        </div>
                        <h3 className="card-title">Traspaso a tienda</h3>
                        <p className="card-description">
                            Registra entradas y salidas de mercancía moviendo productos como en la vida real, sin procesos complicados.
                        </p>

                        <button
                            className="btn-action btn-compra"
                            onClick={() => navigate("/almacen/movimientos")}
                        >
                            <i className="fas fa-arrow-right"></i> Registrar Traspaso
                        </button>
                    </div>
                </section>

            </main>

            {/* Footer */}
            <footer className="footer">
                <div className="footer-content">
                    <p>Sistema de Inventario © Ponchis 2025</p>
                </div>
            </footer>

        </div>
    );
}
