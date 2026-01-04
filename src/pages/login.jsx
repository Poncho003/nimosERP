import "./../assets/css/login.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [checked, setChecked] = useState(false);
    const [correo, setCorreo] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch("http://localhost:3000/api/usuarios/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ correo, password })
            });

            const data = await res.json();

            if (!res.ok) {
                alert(data.error || "Error desconocido");
                return;
            }

            alert("Login correcto");
            navigate("/home");

            // Guardar usuario si quieres usarlo después
            localStorage.setItem("usuario", JSON.stringify(data.usuario));

        } catch (error) {
            alert("Error en el servidor: " + error.message);
        }
    };

    return (
        <div className="login-body">
            <div className="login-container">
                <form onSubmit={handleLogin}>
                    <input
                        type="checkbox"
                        className="input-check"
                        id="input-check"
                        checked={checked}
                        onChange={() => setChecked(!checked)}
                    />

                    <label htmlFor="input-check" className="toggle">
                        <span className="text off">Off</span>
                        <span className="text on">On</span>
                    </label>

                    <div className="login-light"></div>

                    <h2>Login</h2>

                    <div className="input-box">
                        <span className="icon">
                            <ion-icon name="mail"></ion-icon>
                        </span>
                        <input
                            type="email"
                            required
                            value={correo}
                            onChange={(e) => setCorreo(e.target.value)}
                        />
                        <label>Email</label>
                        <div className="input-line"></div>
                    </div>

                    <div className="input-box">
                        <span className="icon">
                            <ion-icon name="lock-closed"></ion-icon>
                        </span>
                        <input
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <label>Password</label>
                        <div className="input-line"></div>
                    </div>

                    <div className="remember-forgot">
                        <a
                            href={`mailto:alfonsomedinaalvarado@gmail.com?subject=Recuperación de contraseña - nimOS&body=Usuario:%0AFecha:${new Date().toLocaleDateString()}`}>
                            Olvidaste tú contraseña?
                        </a>
                    </div>
                    <button type="submit">Login</button>

                    <div className="register-link">
                        <p>
                            No tienes cuenta? <a href={`mailto:alfonsomedinaalvarado@gmail.com?subject=Recuperación de contraseña - nimOS&body=Usuario:%0AFecha:${new Date().toLocaleDateString()}`}>Contactanos</a>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}
