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
      const response = await fetch(`https://5ejrdzjpsd.execute-api.us-east-1.amazonaws.com/dev/lof/${rut}`);
      if (!response.ok) {
        throw new Error("No se pudo obtener la información.");
      }
      const result = await response.json();
      setData(result.results); // Guardamos los datos dentro de 'results'
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
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>Año Comercial</th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>RUT Cliente</th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>Razón Social</th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>Fecha Fin Cto</th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>Tramo Renta</th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>Fecha Inicio Actividades</th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>Fecha Término Giro</th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>Tramo Capital Propio Positivo</th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>Tramo Capital Propio Negativo</th>
            </tr>
          </thead>
          <tbody>
            {/* Iteramos sobre el array de resultados */}
            {data.map((item, index) => (
              <tr key={index}>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>{item.ano_comercial}</td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>{item.cliente_rut}</td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>{item.razon_social}</td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>{item.fecha_fin_cto}</td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>{item.tramo_renta}</td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>{item.fecha_inicio_actividades_vigente}</td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>{item.fecha_termino_giro}</td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>{item.tramo_capital_propio_positivo}</td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>{item.tramo_capital_propio_negativo}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default SearchRut;
