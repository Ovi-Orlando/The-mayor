import { useEffect, useState } from "react";

export default function Home() {
  const [peliculas, setPeliculas] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    fetch("https://gist.githubusercontent.com/Ovi-Orlando/58715e8bdc303394122d0fbf4605faf9/raw/fa7f6f4373f09daaf4a937ac3d74a82df8675e20/gistfile1.txt")
      .then((res) => res.json())
      .then((data) => {
        setPeliculas(data);
        setCargando(false);
      })
      .catch((err) => {
        console.error("Error cargando JSON:", err);
        setCargando(false);
      });
  }, []);

  if (cargando) return <p style={{ padding: "2rem" }}>Cargando catálogo...</p>;

  return (
    <div style={{ padding: "2rem", backgroundColor: "#000", color: "#fff", minHeight: "100vh" }}>
      <h1 style={{ textAlign: "center", marginBottom: "2rem" }}>🎬 Catálogo de Películas</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "1.5rem",
        }}
      >
        {peliculas.map((peli) => (
          <div
            key={peli.id}
            style={{
              background: "#111",
              borderRadius: "10px",
              overflow: "hidden",
              boxShadow: "0 4px 15px rgba(255,255,255,0.1)",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div style={{ flex: "1 1 auto", overflow: "hidden" }}>
              <img
                src={peli.imagen}
                alt={peli.titulo}
                style={{
                  width: "100%",
                  height: "380px",
                  objectFit: "cover",
                  objectPosition: "center",
                }}
              />
            </div>
            <div style={{ padding: "1rem", flex: "0 0 auto" }}>
              <h2 style={{ fontSize: "1.3rem", marginBottom: "0.5rem" }}>{peli.titulo}</h2>
              <p><strong>Género:</strong> {peli.género}</p>
              <p><strong>Año:</strong> {peli.anio}</p>
              <p style={{ fontSize: "0.9rem", color: "#ccc" }}>{peli.descripcion}</p>
              <a
                href={peli.vídeo || peli.video}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-block",
                  marginTop: "1rem",
                  padding: "0.6rem 1.2rem",
                  backgroundColor: "#e50914",
                  color: "#fff",
                  textDecoration: "none",
                  borderRadius: "5px",
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                ▶ Ver Película
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
