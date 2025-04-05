// Escucha mensajes del popup
browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'insertText') {
    insertTextIntoField(message.text);
  }
});

function insertTextIntoField(text) {
  // Selectores para los campos de texto en ChatGPT, Deepseek y elementos input genéricos
  const selectors = [
    'textarea[data-id="root"]', // ChatGPT
    '#prompt-textarea', // ChatGPT alternativo
    '.chat-input textarea', // Deepseek
    '[role="textbox"]', // Selector genérico para campos de texto
    'input[type="text"]', // Input de texto HTML
    'input:not([type])', // Input sin tipo especificado (por defecto es texto)
    'input[type="search"]', // Input de búsqueda
    'input[type="email"]', // Input de email
    'input[type="url"]', // Input de URL
    'textarea', // Selector genérico para cualquier textarea
    'div[contenteditable="true"]' // Divs editables
  ];

  // Busca el campo de texto apropiado
  let textField = null;
  for (const selector of selectors) {
    const element = document.querySelector(selector);
    if (element) {
      textField = element;
      console.log(`Campo de texto encontrado con el selector: ${selector}`);
      break;
    }
  }

  if (!textField) {
    console.error('No se encontró un campo de texto compatible. Verifique los selectores o la estructura de la página.');
    return;
  }

  // Determina si es un input, textarea o un div contenteditable
  const tagName = textField.tagName.toLowerCase();
  const isInput = tagName === 'input';
  const isTextarea = tagName === 'textarea';
  const isContentEditable = textField.isContentEditable;

  if (isInput || isTextarea) {
    const startPos = textField.selectionStart || 0;
    const endPos = textField.selectionEnd || 0;
    const currentText = textField.value;

    // Inserta el nuevo texto
    textField.value = currentText.substring(0, startPos) + 
                     text + 
                     currentText.substring(endPos);

    // Actualiza la posición del cursor
    const newCursorPos = startPos + text.length;
    textField.setSelectionRange(newCursorPos, newCursorPos);
  } else if (isContentEditable) {
    const selection = window.getSelection();
    const range = selection.getRangeAt(0);
    range.deleteContents();
    range.insertNode(document.createTextNode(text));
  } else {
    console.error('El campo de texto encontrado no es compatible para insertar texto.');
    return;
  }

  // Dispara eventos necesarios para asegurar que el cambio sea detectado
  textField.dispatchEvent(new Event('input', { bubbles: true }));
  textField.dispatchEvent(new Event('change', { bubbles: true }));

  // Enfoca el campo de texto
  textField.focus();
}