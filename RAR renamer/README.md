# RAR Renamer

Un script de Node.js que automatiza el renombrado de archivos RAR extrayendo el nombre de la primera carpeta dentro de cada archivo.

## Características

✨ **Renombrado automático** — Renombra archivos `.rar` según el nombre de la carpeta principal que contienen  
🛡️ **Seguridad** — Evita sobrescribir archivos existentes  
📋 **Logging claro** — Muestra el progreso con emojis y mensajes informativos  
⚡ **Procesamiento asíncrono** — Maneja múltiples archivos de forma eficiente  

## Requisitos

- **Node.js** 12.0.0 o superior
- **npm** 6.0.0 o superior
- **UnRAR** instalado en el sistema (para extraer archivos RAR)

## Instalación

1. **Clonar el repositorio:**
```bash
git clone https://github.com/MrJaVMu/RAR-renamer.git
cd RAR-renamer
```

2. **Instalar dependencias:**
```bash
npm install
```

## Uso

1. **Configurar la ruta base:**
   
   Abre [RAR renamer.js](RAR%20renamer.js) y modifica la variable `carpetaBase`:

   ```javascript
   const carpetaBase = 'E:/M u S i C !/2025/06 - junio'; // Tu ruta aquí
   ```

2. **Ejecutar el script:**
```bash
node "RAR renamer.js"
```

## Ejemplo

Supongamos que tienes:
```
📁 downloads/
  ├── archivo123.rar      (contiene 📁 Album_2025/)
  ├── archivo456.rar      (contiene 📁 Podcast_Mayo/)
```

Después de ejecutar el script:
```
📁 downloads/
  ├── Album_2025.rar
  ├── Podcast_Mayo.rar
```

## Salida

El script muestra el progreso con mensajes claros:
- ✅ `Renombrado: archivo123.rar -> Album_2025.rar`
- ❌ `El archivo Album_2025.rar ya existe. Saltando...`
- ⚠️ `No se encontró una carpeta dentro de archivo.rar`

## Dependencias

- **[fs-extra](https://www.npmjs.com/package/fs-extra)** — Operaciones del sistema de archivos
- **[unrar-promise](https://www.npmjs.com/package/unrar-promise)** — Lectura de archivos RAR

## Estructura del Proyecto

```
RAR-renamer/
├── RAR renamer.js        # Script principal
├── package.json          # Dependencias del proyecto
├── dependencias.txt      # Lista de dependencias
├── .gitignore            # Archivos ignorados por Git
├── README.md             # Este archivo
└── unrar/                # Binarios de UnRAR (si aplica)
```

## Notas

- El script solo lee la primera carpeta encontrada dentro del RAR
- Si no encuentra carpetas, muestra un mensaje de advertencia
- Los archivos que ya existen no son sobrescritos
- El directorio original se mantiene intacto; solo se renombra

## Licencia

Este proyecto es de código abierto bajo licencia MIT.

## Autor

**MrJaVMu** — [GitHub](https://github.com/MrJaVMu)

---

¿Problemas o sugerencias? Abre un [issue](https://github.com/MrJaVMu/RAR-renamer/issues) en GitHub.
