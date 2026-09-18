const fs = require('fs');
const path = require('path');

exports.handler = async (event, context) => {
  try {
    // Apuntamos a la carpeta de tus imágenes
    const imagesPath = path.resolve(__dirname, '../../images');
    
    // Leemos el directorio y filtramos para quedarnos solo con las carpetas
    const carpetas = fs.readdirSync(imagesPath).filter(file => {
      return fs.statSync(path.join(imagesPath, file)).isDirectory();
    });

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(carpetas)
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};
