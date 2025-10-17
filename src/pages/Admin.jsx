import { useState } from "react";

export default function Admin() {
  const [autorizado, setAutorizado] = useState(false);
  const [clave, setClave] = useState("");

  const verificarClave = () => {
    if (clave === "admin_ovi") {
      setAutorizado(true);
    } else {
      alert("Clave incorrecta ❌");
    }
  };

  if (!autorizado) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-black text-white">
        <h2 className="text-2xl mb-4">🔒 Acceso restringido</h2>
        <input
          type="password"
          placeholder="Introduce tu clave"
          className="p-2 rounded bg-neutral-800 border border-neutral-700 text-center"
          value={clave}
          onChange={(e) => setClave(e.target.value)}
        />
        <button
          onClick={verificarClave}
          className="mt-3 bg-red-600 px-4 py-2 rounded hover:bg-red-700 transition"
        >
          Entrar
        </button>
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen text-white p-6">
      <h1 className="text-3xl font-bold mb-4">🎬 Panel Admin</h1>
      <p>Aquí podrás agregar o editar películas próximamente.</p>
    </div>
  );
}
