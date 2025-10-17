import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Home() {
  const [peliculas, setPeliculas] = useState([]);
  const [peliculaSeleccionada, setPeliculaSeleccionada] = useState(null);
  const [indexBanner, setIndexBanner] = useState(0);

  useEffect(() => {
    fetch(
      "https://gist.githubusercontent.com/Ovi-Orlando/58715e8bdc303394122d0fbf4605faf9/raw/fa7f6f4373f09daaf4a937ac3d74a82df8675e20/gistfile1.txt"
    )
      .then((res) => res.json())
      .then((data) => setPeliculas(data))
      .catch((err) => console.error("Error al cargar JSON:", err));
  }, []);

  // Cambio automático del banner cada 5 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      if (peliculas.length > 0) {
        setIndexBanner((prev) => (prev + 1) % peliculas.length);
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [peliculas]);

  const peliculaBanner = peliculas[indexBanner];

  return (
    <div className="bg-black min-h-screen text-white">
      {/* 🎞️ Banner rotatorio */}
      {peliculaBanner && (
        <motion.div
          key={peliculaBanner.id}
          className="relative w-full h-[60vh] overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <img
            src={peliculaBanner.imagen}
            alt={peliculaBanner.titulo}
            className="w-full h-full object-cover brightness-75"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent flex flex-col justify-end p-8">
            <h1 className="text-3xl md:text-5xl font-bold">
              {peliculaBanner.titulo}
            </h1>
            <p className="text-gray-300 max-w-2xl mt-2">
              {peliculaBanner.descripcion.slice(0, 150)}...
            </p>
            <button
              onClick={() => setPeliculaSeleccionada(peliculaBanner)}
              className="bg-red-600 mt-4 px-5 py-2 rounded-lg text-white font-semibold hover:bg-red-700 transition"
            >
              ▶ Ver ahora
            </button>
          </div>
        </motion.div>
      )}

      {/* 🎬 Catálogo */}
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">Películas</h2>
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
                <p className="text-sm text-gray-400">
                  {peli.genero} • {peli.anio}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 🎥 Modal tipo Netflix */}
      {peliculaSeleccionada && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
          <div className="bg-neutral-900 rounded-2xl p-4 max-w-3xl w-full relative">
            <button
              onClick={() => setPeliculaSeleccionada(null)}
              className="absolute top-2 right-2 text-white text-2xl"
            >
              ✕
            </button>

            <h2 className="text-2xl font-bold mb-2">
              {peliculaSeleccionada.titulo}
            </h2>
            <p className="text-gray-400 mb-4">
              {peliculaSeleccionada.descripcion}
            </p>

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
