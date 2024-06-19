import { useState } from 'react';
import axios from 'axios';
import 'dotenv/config';

export default function Home() {
  const [cedula, setCedula] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    const URL = process.env.NEXT_PUBLIC_API_URL
    const API = process.env.NEXT_PUBLIC_API_KEY;
    
    const config = {
      headers: {
        'api': `${API}`  
      }
    };
    try {
     const response = await axios.get(`${URL}${cedula}`,config);
    //const response = await axios.get(`http://localhost:31015/${cedula}`,config);
          setResult(response.data[0]);
      setError(null);
    } catch (err) {
      setError('No se encontraron datos para la cédula ingresada.');
      setResult(null);
    }
  };

  return (
    <div className="container">
      <h1>Busqueda por Cédula</h1>
      <div className="search-container">
        <input 
          type="text" 
          value={cedula} 
          onChange={(e) => setCedula(e.target.value)} 
          placeholder="Ingrese la cédula"
        />
        <button onClick={handleSearch}>Buscar</button>
      </div>
      {error && <p className="error">{error}</p>}
      {result && (
        <div className="result">
          <h2>Resultados:</h2>
          <p><strong>Cédula:</strong> {result.cedula}</p>
          <p><strong>Nombre:</strong> {result.nombre}</p>
          <p><strong>Estado:</strong> {result.estado}</p>
          <p><strong>Municipio:</strong> {result.municipio}</p>
          <p><strong>Parroquia:</strong> {result.parroquia}</p>
          <p><strong>Centro:</strong> {result.centro}</p>
        </div>
      )}
      <style jsx>{`
        .container {
          max-width: 600px;
          margin: 50px auto;
          padding: 20px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          border-radius: 10px;
          background-color: #ffffff;
        }

        h1 {
          text-align: center;
          margin-bottom: 20px;
          color: #333;
        }

        .search-container {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 10px;
          margin-bottom: 20px;
        }

        input {
          padding: 10px;
          font-size: 16px;
          border-radius: 5px;
          border: 1px solid #ddd;
          flex: 1;
        }

        button {
          padding: 10px 20px;
          font-size: 16px;
          border: none;
          border-radius: 5px;
          background-color: #0070f3;
          color: white;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }

        button:hover {
          background-color: #005bb5;
        }

        .error {
          color: red;
          text-align: center;
          margin-top: 20px;
        }

        .result {
          margin-top: 20px;
        }

        .result h2 {
          margin-bottom: 10px;
          color: #333;
        }

        .result p {
          margin: 5px 0;
          color: #555;
        }

        .result p strong {
          color: #000;
        }
      `}</style>
    </div>
  );
}
