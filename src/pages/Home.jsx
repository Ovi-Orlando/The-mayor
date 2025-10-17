import { useEffect, useState } from "react";

export default function Home() {
  const [peliculas, setPeliculas] = useState([]);
  const [peliculaSeleccionada, setPeliculaSeleccionada] = useState(null);

  useEffect(() => {
    fetch("https://gist.githubusercontent.com/Ovi-Orlando/58715e8bdc303394122d0fbf4605faf9/raw/fa7f6f4373f09daaf4a937ac3d74a82df8675e20/gistfile1.txt")
      .then((res) => res.json())
      .then((data) => setPeliculas(data))
      .catch((err) => console.error("Error al cargar JSON:", err));
  }, []);

  return (
    <div className="bg-black min-h-screen text-white p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">🎬 The Mayor</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {peliculas.map((peli) => (
          <div
            key={peli.id}
            className="bg-neutral-900 rounded-xl overflow-hidden hover:scale-105 transition-transform cursor-pointer"
            onClick={() => setPeliculaSeleccionada(peli)}
          >
            <img
              src={peli.imagen}
              alt={peli.titulo}
              className="w-full h-64 object-cover"
            />
            <div className="p-2 text-center">
              <h2 className="text-lg font-semibold">{peli.titulo}</h2>
              <p className="text-sm text-gray-400">{peli.genero} • {peli.anio}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Modal tipo Netflix */}
      {peliculaSeleccionada && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
          <div className="bg-neutral-900 rounded-2xl p-4 max-w-3xl w-full relative">
            <button
              onClick={() => setPeliculaSeleccionada(null)}
              className="absolute top-2 right-2 text-white text-2xl"
            >
              ✕
            </button>

            <h2 className="text-2xl font-bold mb-2">{peliculaSeleccionada.titulo}</h2>
            <p className="text-gray-400 mb-4">{peliculaSeleccionada.descripcion}</p>

            <div className="aspect-video mb-4">
              <iframe
                src={peliculaSeleccionada.vídeo.replace("details", "embed")}
                title={peliculaSeleccionada.titulo}
                allowFullScreen
                className="w-full h-full rounded-lg"
              ></iframe>
            </div>

            <div className="text-right text-gray-400 text-sm">
              {peliculaSeleccionada.genero} • {peliculaSeleccionada.anio}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
