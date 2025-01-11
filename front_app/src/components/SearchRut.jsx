import React, { useState } from "react";

const SearchRut = () => {
  const [rut, setRut] = useState("");
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    if (!rut) {
      setError("Por favor, ingresa un RUT.");
      return;
    }
    setError("");

    try {
      const response = await fetch(`http://localhost:8000/lof/${rut}`);
      console.log(response);
      if (!response.ok) {
        throw new Error("No se pudo obtener la información.");
      }
      const result = await response.json();
      setData(result);
    } catch (err) {
      setError("Error al buscar el RUT. Por favor, verifica la API.");
      setData(null);
    }
  };

  const handleReset = () => {
    setRut("");     // Limpiar el campo de texto
    setData(null);  // Limpiar los datos
    setError("");   // Limpiar el error
  };

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
      <h2>Búsqueda por RUT</h2>
      <div style={{ marginBottom: "10px" }}>
        <input
          type="text"
          placeholder="Ingresa el RUT"
          value={rut}
          onChange={(e) => setRut(e.target.value)}
          style={{
            padding: "10px",
            width: "calc(100% - 22px)",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
        />
      </div>
      <button
        onClick={handleSearch}
        style={{
          padding: "10px 20px",
          backgroundColor: "#007BFF",
          color: "#fff",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
          marginRight: "10px", // Espacio entre los botones
        }}
      >
        Buscar
      </button>
      <button
        onClick={handleReset}
        style={{
          padding: "10px 20px",
          backgroundColor: "#FF5733",
          color: "#fff",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Reset
      </button>
      {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
      {data && (
        <table
          style={{
            width: "100%",
            marginTop: "20px",
            borderCollapse: "collapse",
            textAlign: "left",
          }}
        >
          <thead>
            <tr>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>Campo</th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>Valor</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(data).map(([key, value]) => (
              <tr key={key}>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>{key}</td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>{value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default SearchRut;
