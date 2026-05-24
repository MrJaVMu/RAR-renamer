# Mejoras propuestas para RAR renamer

Revisión del código actual de `RAR renamer.js`. Organizado por prioridad.

## Problemas / bugs

### 1. Filtro de extensión no es case-insensitive
En `RAR renamer.js:31`, `archivo.endsWith('.rar')` no detecta `.RAR`, `.Rar`, etc.

```js
// Antes
archivo.endsWith('.rar')
// Después
archivo.toLowerCase().endsWith('.rar')
```

### 2. No maneja archivos multi-volumen
Patrones como `.part1.rar`, `.part2.rar`, `.r00`, `.r01`...

Si se renombra `archivo.part1.rar` se rompe la cadena de volúmenes. Habría que:
- Detectar el patrón multi-volumen y saltar, o
- Renombrar el set completo de forma coherente.

### 3. Sanitización del nombre de carpeta
`nombreCarpeta` viene del contenido del RAR y se usa directamente como nombre de fichero.

Si contiene caracteres inválidos en Windows (`/`, `\`, `:`, `*`, `?`, `"`, `<`, `>`, `|`) o trailing slash, `fs.rename` fallará o creará subdirectorios inesperados.

Solución: usar `sanitize-filename` (ya está en `node_modules` como dependencia transitiva).

### 4. Carpeta anidada como "primera"
`list()` puede devolver primero `Album/CD1/` antes que `Album/`. El bucle actual toma la primera entrada `type === 'directory'`, que podría no ser la carpeta raíz.

Mejor:
- Tomar la ruta más corta, o
- Tomar el primer segmento de cualquier entrada: `elemento.path.split('/')[0]`.

### 5. `nombreCarpeta` puede traer slash final
Ejemplo: `Mi Album/` → genera `Mi Album/.rar`.

Hacer `trim` de separadores antes de concatenar `.rar`.

## Mejoras de calidad

### 6. Ruta hardcodeada
En `RAR renamer.js:7`, la ruta está fija. Pasarla por argumento:

```js
const carpetaBase = process.argv[2] || './test';
```

### 7. Modo dry-run
Un flag `--dry-run` que solo imprima los renombrados sin tocar el disco. Muy útil antes de correr sobre tandas grandes (100+ archivos).

### 8. Procesamiento secuencial innecesario
El `for` con `await` es secuencial. Para muchos RARs grandes, `Promise.all` con límite de concurrencia (`p-limit`) acelera.

Nota: para listar headers de RAR el cuello de botella es I/O del disco, así que secuencial puede ser suficiente. Medir antes de cambiar.

### 9. Resumen final
Útil para tandas grandes:

```js
console.log(`Renombrados: ${ok}, saltados: ${skip}, errores: ${err}`);
```

### 10. package.json con script `start`
Para correr `npm start` en lugar de `node "RAR renamer.js"`. El espacio en el nombre del fichero es molesto en la línea de comandos.

### 11. Dependencia `unrar-promise` sin mantenimiento
Lleva años sin actualizarse. Alternativa: `node-unrar-js` (ya instalada como transitiva).

Ventajas:
- WASM puro, no necesita el `UnRAR.exe` externo.
- Multiplataforma.

## Orden sugerido de implementación

Mínimo recomendado:
1. Bugs: items 1, 3, 4, 5.
2. CLI: item 6 (argumento).
3. Seguridad de uso: item 7 (dry-run).

Después, según necesidad: 2 (multi-volumen), 9 (resumen), 10 (script npm), 11 (cambio de dependencia).
