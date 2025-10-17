import { useState } from "react";

export default function Admin() {
  const [peliculas, setPeliculas] = useState([]);
  const [form, setForm] = useState({
    titulo: "",
    género: "",
    anio: "",
    descripcion: "",
    imagen: "",
    video: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const nuevaPelicula = { ...form, id: Date.now() };
    setPeliculas([...peliculas, nuevaPelicula]);
    setForm({ titulo: "", género: "", anio: "", descripcion: "", imagen: "", video: "" });
  };

  const eliminar = (id) => {
    setPeliculas(peliculas.filter((p) => p.id !== id));
  };

  return (
    <div style={{ padding: "2rem", backgroundColor: "#111", color: "#fff", minHeight: "100vh" }}>
      <h1 style={{ textAlign: "center", marginBottom: "2rem" }}>🎬 Panel de Administración</h1>

      <form
        onSubmit={handleSubmit}
        style={{
          maxWidth: "600px",
          margin: "0 auto 2rem",
          background: "#222",
          padding: "1.5rem",
          borderRadius: "10px",
        }}
      >
        <h2>Agregar Película</h2>
        {["titulo", "género", "anio", "descripcion", "imagen", "video"].map((campo) => (
          <div key={campo} style={{ marginBottom: "1rem" }}>
            <label style={{ display: "block", marginBottom: "0.3rem" }}>
              {campo.charAt(0).toUpperCase() + campo.slice(1)}:
            </label>
            <input
              type="text"
              name={campo}
              value={form[campo]}
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: "0.6rem",
                borderRadius: "5px",
                border: "none",
                background: "#333",
                color: "#fff",
              }}
            />
          </div>
        ))}

        <button
          type="submit"
          style={{
            background: "#e50914",
            border: "none",
            padding: "0.8rem 1.2rem",
            color: "#fff",
            borderRadius: "5px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          ➕ Agregar Película
        </button>
      </form>

      {peliculas.length > 0 && (
        <div>
          <h2 style={{ textAlign: "center", marginBottom: "1rem" }}>Películas añadidas</h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "1rem",
            }}
          >
            {peliculas.map((p) => (
              <div key={p.id} style={{ background: "#222", borderRadius: "10px", padding: "1rem" }}>
                <img
                  src={p.imagen}
                  alt={p.titulo}
                  style={{ width: "100%", height: "200px", objectFit: "cover", borderRadius: "8px" }}
                />
                <h3 style={{ marginTop: "0.5rem" }}>{p.titulo}</h3>
                <button
                  onClick={() => eliminar(p.id)}
                  style={{
                    background: "#e50914",
                    border: "none",
                    padding: "0.5rem 1rem",
                    color: "#fff",
                    borderRadius: "5px",
                    cursor: "pointer",
                    marginTop: "0.5rem",
                  }}
                >
                  🗑 Eliminar
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
