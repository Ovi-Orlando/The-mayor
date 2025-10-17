import { useEffect, useState } from "react";

export default function Home() {
  const [peliculas, setPeliculas] = useState([]);

  useEffect(() => {
    fetch("https://gist.githubusercontent.com/Ovi-Orlando/58715e8bdc303394122d0fbf4605faf9/raw/fa7f6f4373f09daaf4a937ac3d74a82df8675e20/gistfile1.txt")
      .then((response) => response.json())
      .then((data) => setPeliculas(data))
      .catch((error) => console.error("Error al cargar el catálogo:", error));
  }, []);

  return (
    <div style={{ backgroundColor: "#000", color: "#fff", minHeight: "100vh", padding: "2rem" }}>
      <h1 style={{ textAlign: "center", marginBottom: "2rem" }}>🎥 Catálogo de Películas</h1>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "1.5rem" }}>
        {peliculas.map((peli) => (
          <div key={peli.id} style={{ backgroundColor: "#111", borderRadius: "12px", overflow: "hidden", boxShadow: "0 4px 10px rgba(0,0,0,0.5)" }}>
            <img src={peli.imagen.trim()} alt={peli.titulo} style={{ width: "100%", height: "380px", objectFit: "cover" }} />
            <div style={{ padding: "1rem" }}>
              <h3>{peli.titulo}</h3>
              <p style={{ fontSize: "0.9rem", opacity: 0.8 }}>{peli.descripcion}</p>
              <p style={{ marginTop: "0.5rem", fontSize: "0.8rem", color: "#ccc" }}>
                🎭 {peli.género} | 📅 {peli.anio} | 🎬 {peli.tipo}
              </p>
              <a href={peli.vídeo.trim()} target="_blank" rel="noopener noreferrer" style={{ display: "inline-block", marginTop: "1rem", background: "#e50914", color: "#fff", padding: "0.5rem 1rem", borderRadius: "8px", textDecoration: "none" }}>
                Ver Película
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
