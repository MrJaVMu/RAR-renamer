const fs = require('fs-extra');
const path = require('path');
const { list } = require('unrar-promise');

// Ruta de la carpeta donde están los archivos .rar 
//const carpetaBase = './RAR renamer/test';
 const carpetaBase = 'E:/M u S i C !/2025/06 - junio';

// Función para obtener el nombre de la primera carpeta dentro del .rar
async function obtenerNombreCarpeta(rutaArchivo) {
    try {
        const archivos = await list(rutaArchivo); // Obtener listado de archivos en el .rar

        // Recorrer el listado y buscar el primer elemento que sea una carpeta
        for (const elemento of archivos) {
            if (elemento.type === 'directory') {
                return elemento.path;
            }
        }
        return null; // Si no encuentra ninguna carpeta, devolver null
    } catch (error) {
        console.error(`Error al leer ${rutaArchivo}:`, error.message);
        return null;
    }
}

// Función para renombrar archivos .rar
async function renombrarArchivosRar() {
    try {
        const archivos = await fs.readdir(carpetaBase);
        const archivosRar = archivos.filter(archivo => archivo.endsWith('.rar'));

        for (const archivo of archivosRar) {
            const rutaArchivo = path.join(carpetaBase, archivo);
            const nombreCarpeta = await obtenerNombreCarpeta(rutaArchivo);

            if (nombreCarpeta) {
                const nuevoNombre = `${nombreCarpeta}.rar`;
                const rutaNuevoNombre = path.join(carpetaBase, nuevoNombre);

                if (await fs.pathExists(rutaNuevoNombre)) {
                    console.log(`❌ El archivo ${nuevoNombre} ya existe. Saltando...`);
                    continue;
                }

                await fs.rename(rutaArchivo, rutaNuevoNombre);
                console.log(`✅ Renombrado: ${archivo} -> ${nuevoNombre}`);
            } else {
                console.log(`⚠️ No se encontró una carpeta dentro de ${archivo}`);
            }
        }

        console.log('🚀 Proceso completado.');
    } catch (error) {
        console.error('❌ Error general:', error.message);
    }
}

// Ejecutar la función
renombrarArchivosRar();