const fs = require('fs');
const path = require('path');

exports.handler = async (event, context) => {
  try {
    const imagesPath = path.resolve(__dirname, '../../images');
    
    // 1. Detectar todas las carpetas reales
    let carpetas = fs.readdirSync(imagesPath).filter(file => {
      return fs.statSync(path.join(imagesPath, file)).isDirectory();
    });

    // 2. Definir cuáles van primero estrictamente (deben coincidir en mayúsculas/minúsculas)
    const prioridad = ["Aymara", "Carolina", "Nia"];

    // 3. Separar las prioritarias de las demás
    let principales = prioridad.filter(c => carpetas.includes(c));
    let resto = carpetas.filter(c => !prioridad.includes(c));

    // 4. Ordenar el resto alfabéticamente
    resto.sort((a, b) => a.localeCompare(b));

    // 5. Unir ambas listas manteniendo el orden deseado
    const listaFinal = [...principales, ...resto];

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(listaFinal)
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};
