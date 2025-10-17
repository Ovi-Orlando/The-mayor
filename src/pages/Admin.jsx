import { useState } from "react";

export default function Admin() {
  const [clave, setClave] = useState("");
  const [autenticado, setAutenticado] = useState(false);

  const verificarClave = () => {
    if (clave === "admin_ovi") setAutenticado(true);
    else alert("Clave incorrecta");
  };

  return (
    <div style={{ background: "#000", color: "#fff", minHeight: "100vh", padding: "2rem" }}>
      {!autenticado ? (
        <div style={{ textAlign: "center" }}>
          <h2>🔐 Acceso Administrador</h2>
          <input
            type="password"
            placeholder="Ingresa tu clave"
            value={clave}
            onChange={(e) => setClave(e.target.value)}
            style={{ padding: "0.5rem", borderRadius: "5px", marginRight: "0.5rem" }}
          />
          <button onClick={verificarClave} style={{ padding: "0.5rem 1rem", background: "#e50914", color: "#fff", border: "none", borderRadius: "5px" }}>
            Entrar
          </button>
        </div>
      ) : (
        <div style={{ textAlign: "center" }}>
          <h1>🎬 Panel de Administración</h1>
          <p>Aquí podrás subir y gestionar tus películas (versión completa próximamente).</p>
        </div>
      )}
    </div>
  );
}
