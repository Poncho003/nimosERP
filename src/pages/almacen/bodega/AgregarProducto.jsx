import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../../assets/css/AgregarProductoStyle.css";
import ImagePicker from "../../../componets/ImagePicker";
import "@fortawesome/fontawesome-free/css/all.min.css";

export default function AgregarProducto() {
    const [step, setStep] = useState(1);
    const navigate = useNavigate();
    const [form, setForm] = useState({
        nombre: "",
        marca: "",
        clasificacion: "",
        precioCompra: "",
        precioVenta: "",
        cantidad: "",
        imagen: ""
    });
    const CLASIFICACIONES = [
        "camisas",
        "camisetas",
        "teni",
        "accesorio"
    ];

    const hayCambios = () => {
        return Object.values(form).some(v => v !== "");
    };

    const MARCAS = [
        "Adidas",
        "Nike",
        "Puma",
        "On Cloud"
    ];

    const guardarProducto = async () => {
        try {
            const res = await fetch("http://localhost:3000/api/productos", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    _id: "p" + Date.now(),
                    nombre: form.nombre,
                    clasificacion: form.clasificacion,
                    marca: form.marca,
                    imagen: form.imagen,           
                    precioCompra: Number(form.precioCompra),
                    precioVenta: Number(form.precioVenta),
                    cantidad: Number(form.cantidad),
                    proveedorId: "prov1",
                    sucursal: "Patzcuaro"
                }),

            });

            const data = await res.json();
            if (!res.ok) {
                console.error(data);
                throw new Error(data.error || "Error al guardar");
            }

            alert("Producto guardado correctamente ✅");
            navigate("/almacen/productos");

        } catch (err) {
            console.error(err);
            alert("No se pudo guardar producto ❌");
        }
    };

    return (
        <>
            <div className="page-agregar-producto">
                {/* HEADER */}
                <div className="header-fullwide">
                    <div className="page-header d-flex justify-content-between align-items-center">
                        <div>
                            <h1 className="page-title">Agregar producto</h1>
                            <p>Registra un nuevo producto en tu bodega</p>
                        </div>

                        <button
                            className="btn-action btn-home"
                            onClick={() => {
                                if (hayCambios()) {
                                    const salir = window.confirm(
                                        "Tienes cambios sin guardar.\n\n¿Deseas salir y perderlos?"
                                    );
                                    if (!salir) return;
                                }
                                navigate("/almacen/productos");
                            }}
                        >
                            <i className="fas fa-arrow-left"></i>
                            Volver
                        </button>

                    </div>
                </div>

                {/* CONTENIDO */}
                <div className="inventory-wrapper container">

                    {/* BLOQUE 1 — Identidad del producto */}
                    <section className="step-section">

                        {/* HEADER DEL PASO */}
                        <div
                            className="step-header"
                            onClick={() => step > 1 && setStep(1)}
                            style={{ cursor: step > 1 ? "pointer" : "default" }}
                        >
                            <i className="fas fa-box"></i>
                            <h3>1. Identidad del producto</h3>
                        </div>

                        {/* CONTENIDO SOLO SI ES EL PASO ACTIVO */}
                        {step === 1 && (
                            <div className="step-content">

                                <input
                                    type="text"
                                    placeholder="Nombre del producto"
                                    value={form.nombre}
                                    onChange={e =>
                                        setForm({ ...form, nombre: e.target.value })
                                    }
                                />

                                <select
                                    value={form.marca}
                                    onChange={e =>
                                        setForm({ ...form, marca: e.target.value })
                                    }
                                >
                                    <option value="">Selecciona una marca</option>

                                    {MARCAS.map((m) => (
                                        <option key={m} value={m}>
                                            {m}
                                        </option>
                                    ))}
                                </select>

                                <select
                                    value={form.clasificacion}
                                    onChange={e =>
                                        setForm({ ...form, clasificacion: e.target.value })
                                    }
                                >
                                    <option value="">Selecciona una clasificación</option>

                                    {CLASIFICACIONES.map((c) => (
                                        <option key={c} value={c}>
                                            {c}
                                        </option>
                                    ))}
                                </select>

                                <div className="step-next">
                                    <button
                                        className="btn-action btn-envios"
                                        disabled={!form.nombre}
                                        onClick={() => setStep(2)}
                                    >
                                        Continuar
                                    </button>
                                </div>

                            </div>
                        )}

                    </section>

                    {/* BLOQUE 2 — Precios */}
                    <section className="step-section">

                        {/* HEADER DEL PASO */}
                        <div
                            className="step-header"
                            onClick={() => step > 2 && setStep(2)}
                            style={{ cursor: step > 2 ? "pointer" : "default" }}
                        >
                            <i className="fas fa-dollar-sign"></i>
                            <h3>2. Precios</h3>
                        </div>

                        {/* CONTENIDO SOLO SI ES EL PASO ACTIVO */}
                        {step === 2 && (
                            <div className="step-content">

                                <input
                                    type="number"
                                    placeholder="Precio de compra"
                                    value={form.precioCompra}
                                    onChange={e =>
                                        setForm({ ...form, precioCompra: e.target.value })
                                    }
                                />

                                <input
                                    type="number"
                                    placeholder="Precio de venta"
                                    value={form.precioVenta}
                                    onChange={e =>
                                        setForm({ ...form, precioVenta: e.target.value })
                                    }
                                />

                                <div className="step-next">
                                    <button
                                        className="btn-action btn-envios"
                                        disabled={!form.precioVenta}
                                        onClick={() => setStep(3)}
                                    >
                                        Continuar
                                    </button>
                                </div>

                            </div>
                        )}

                    </section>

                    {/* BLOQUE 3 — Cantidad inicial */}
                    <section className="step-section">

                        {/* HEADER DEL PASO */}
                        <div
                            className="step-header"
                            onClick={() => step > 3 && setStep(3)}
                            style={{ cursor: step > 3 ? "pointer" : "default" }}
                        >
                            <i className="fas fa-cubes"></i>
                            <h3>3. Cantidad inicial</h3>
                        </div>

                        {/* CONTENIDO SOLO SI ES EL PASO ACTIVO */}
                        {step === 3 && (
                            <div className="step-content">

                                <input
                                    type="number"
                                    placeholder="Cantidad en bodega"
                                    value={form.cantidad}
                                    onChange={e =>
                                        setForm({ ...form, cantidad: e.target.value })
                                    }
                                />

                                <div className="step-next">
                                    <button
                                        className="btn-action btn-envios"
                                        disabled={!form.cantidad}
                                        onClick={() => setStep(4)}
                                    >
                                        Continuar
                                    </button>
                                </div>

                            </div>
                        )}

                    </section>

                    {/* BLOQUE 4 — Imagen del producto */}
                    <section className="step-section">

                        {/* HEADER DEL PASO */}
                        <div
                            className="step-header"
                            onClick={() => step > 4 && setStep(4)}
                            style={{ cursor: step > 4 ? "pointer" : "default" }}
                        >
                            <i className="fas fa-image"></i>
                            <h3>4. Imagen del producto</h3>
                        </div>

                        {/* CONTENIDO SOLO SI ES EL PASO ACTIVO */}
                        {step === 4 && (
                            <div className="step-content">

                                <ImagePicker
                                    value={form.imagen}
                                    onChange={(img) =>
                                        setForm({ ...form, imagen: img })
                                    }
                                />

                                <div className="step-next">
                                    <button
                                        className="btn-action btn-envios"
                                        disabled={!form.imagen}
                                        onClick={() => setStep(5)}
                                    >
                                        Continuar
                                    </button>
                                </div>

                            </div>
                        )}

                    </section>

                    {/* ACCIÓN FINAL */}
                    {step === 5 && (
                        <div className="final-action">
                            <button className="btn-action btn-envios" onClick={guardarProducto}>
                                <i className="fas fa-check"></i>
                                Guardar producto
                            </button>
                        </div>
                    )}

                </div>
            </div>
        </>
    );
}
