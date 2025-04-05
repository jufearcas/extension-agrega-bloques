# Agrega Bloques - Extensión para Firefox

Esta extensión te permite guardar y reutilizar bloques de texto frecuentemente usados en ChatGPT y Deepseek.

## Características

- Guarda bloques de texto personalizados con nombres descriptivos
- Inserta rápidamente los bloques guardados en los campos de texto de ChatGPT y Deepseek
- Gestiona (añade/elimina) tus bloques de texto desde una interfaz simple
- Funciona en las siguientes páginas:
  - chat.openai.com (ChatGPT)
  - deepseek.com

## Instalación

### Instalación temporal (para desarrollo)

1. Abre Firefox y navega a `about:debugging`
2. Haz clic en "This Firefox"
3. Haz clic en "Load Temporary Add-on"
4. Selecciona el archivo `manifest.json` de la extensión

### Instalación permanente

La extensión aún no está disponible en Firefox Add-ons. Próximamente estará disponible para su instalación permanente.

## Uso

1. Haz clic en el ícono de la extensión en la barra de herramientas de Firefox
2. Para guardar un nuevo bloque:
   - Escribe o pega el texto que deseas guardar en el área de texto
   - Dale un nombre descriptivo al bloque
   - Haz clic en "Guardar Bloque"
3. Para usar un bloque guardado:
   - Abre ChatGPT o Deepseek
   - Coloca el cursor donde deseas insertar el texto
   - Haz clic en el ícono de la extensión
   - Haz clic en "Insertar" junto al bloque que deseas usar

## Gestión de bloques

- Los bloques se guardan localmente en tu navegador
- Puedes eliminar bloques haciendo clic en el botón "Eliminar" junto a cada bloque
- Los bloques persistirán incluso después de cerrar el navegador

## Privacidad

- Todos los datos se almacenan localmente en tu navegador
- No se envía ninguna información a servidores externos
- La extensión solo tiene acceso a las páginas de ChatGPT y Deepseek

## Desarrollo

Para desarrollar la extensión:

1. Clona este repositorio
2. Abre Firefox y navega a `about:debugging`
3. Haz clic en "This Firefox"
4. Haz clic en "Load Temporary Add-on"
5. Selecciona el archivo `manifest.json`

Los cambios en los archivos se reflejarán al recargar la extensión en `about:debugging`.
