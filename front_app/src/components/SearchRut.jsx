import React, { useState } from "react";
import "./SearchRut.css"; // Importa el archivo CSS

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
      if (result.results && result.results.length === 0) {
        setData([]);  // Si no hay resultados, se establece como un array vacío
      } else {
        setData(result.results);  // Guardamos los datos dentro de 'results'
      }
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
    <div className="container">
      <h2>Búsqueda de Empresas</h2>
      <h3>Ingrese un RUT o una palabra que contenga en el nombre</h3>
      <div>
        <input
          type="text"
          placeholder="RUT 1111111-1 ó texto del nombre"
          value={rut}
          onChange={(e) => setRut(e.target.value)}
        />
      </div>
      <div className="button-container">
        <button className="search-button" onClick={handleSearch}>Buscar</button>
        <button className="reset-button" onClick={handleReset}>Limpiar</button>
      </div>
      {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th className="ano-comercial">Año Comercial</th>
              <th className="rut-cliente">RUT Cliente</th>
              <th className="razon-social">Razón Social</th>
              <th className="fecha-fin-cto">Fecha Fin Cto. Lof</th>
              <th className="tramo-renta">Tramo Renta</th>
              <th className="fecha-inicio-actividades">Fecha Inicio Actividades</th>
              <th className="fecha-termino-giro">Fecha Término Giro</th>
              <th className="tramo-capital-propio-positivo">Tramo Capital Propio Positivo</th>
              <th className="tramo-capital-propio-negativo">Tramo Capital Propio Negativo</th>
            </tr>
          </thead>
          <tbody>
            {data === null ? (
              <tr>
                <td colSpan="9" style={{ textAlign: "center", color: "orange" }}>
                  
                </td>
              </tr>
            ) : (
              data.map((item, index) => (
                <tr key={index}>
                  <td>{item.ano_comercial}</td>
                  <td>{item.cliente_rut}</td>
                  <td>{item.razon_social}</td>
                  <td>{item.fecha_fin_cto}</td>
                  <td>{item.tramo_renta}</td>
                  <td>{item.fecha_inicio_actividades_vigente}</td>
                  <td>{item.fecha_termino_giro}</td>
                  <td>{item.tramo_capital_propio_positivo}</td>
                  <td>{item.tramo_capital_propio_negativo}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SearchRut;
