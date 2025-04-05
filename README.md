# TextoFlash

## Descripción corta
Agiliza tu escritura con bloques de texto predefinidos. Inserta frases o plantillas en cualquier campo de texto con un clic, ideal para productividad y eficiencia.

## Descripción larga
Este complemento te permite insertar bloques de texto predefinidos en cualquier campo de texto, ya sea en formularios, correos electrónicos o editores de texto. Simplifica tareas repetitivas con plantillas personalizables, ahorrando tiempo y mejorando tu productividad. Compatible con navegadores modernos, es perfecto para profesionales, estudiantes y cualquier persona que busque optimizar su flujo de trabajo. ¡Haz más en menos tiempo!

## ¿Cómo funciona la extensión?

La extensión utiliza un script de contenido que interactúa con los campos de texto activos en la página web. Cuando seleccionas un bloque de texto predefinido desde el popup de la extensión, este se inserta automáticamente en el campo de texto activo. La extensión es compatible con los siguientes tipos de campos:

- Campos de texto `<textarea>`
- Campos de entrada `<input>`
- Elementos con contenido editable (`contenteditable`)

### Detalles técnicos

1. **Detección del campo activo:**
   La extensión identifica el campo de texto activo en la página web utilizando `document.activeElement`.

2. **Inserción de texto:**
   - Para campos `<textarea>` y `<input>`, el texto se inserta en la posición del cursor.
   - Para elementos `contenteditable`, el texto se inserta en la posición seleccionada.

3. **Eventos de actualización:**
   Después de insertar el texto, se disparan los eventos `input` y `change` para garantizar que cualquier lógica asociada al campo de texto se actualice correctamente.

## ¿Cómo usar la extensión?

1. **Instalación:**
   - Descarga e instala la extensión desde Firefox Add-ons o el archivo `.zip` proporcionado.

2. **Configuración inicial:**
   - Abre el popup de la extensión haciendo clic en el ícono de la barra de herramientas.
   - Define tus bloques de texto predefinidos en el popup.

3. **Uso:**
   - Navega a cualquier página web con campos de texto.
   - Haz clic en el ícono de la extensión y selecciona el bloque de texto que deseas insertar.
   - El texto se insertará automáticamente en el campo de texto activo.

4. **Compatibilidad:**
   - La extensión es compatible con la mayoría de los navegadores modernos que soportan extensiones basadas en WebExtensions.

## Contribuciones

Si deseas contribuir al desarrollo de esta extensión, por favor sigue estos pasos:

1. Clona el repositorio.
2. Realiza tus cambios en una nueva rama.
3. Envía un pull request con una descripción detallada de tus cambios.

## Licencia

Esta extensión está licenciada bajo [MIT License](LICENSE).
