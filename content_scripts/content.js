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
    'input[type="url"]' // Input de URL
  ];

  // Busca el campo de texto apropiado
  let textField = null;
  for (const selector of selectors) {
    const element = document.querySelector(selector);
    if (element) {
      textField = element;
      break;
    }
  }

  if (!textField) {
    console.error('No se encontró un campo de texto compatible');
    return;
  }

  // Determina si es un input o textarea para usar el método apropiado
  const isInput = textField.tagName.toLowerCase() === 'input';

  if (isInput) {
    // Para elementos input
    const currentText = textField.value;
    const startPos = textField.selectionStart || 0;
    const endPos = textField.selectionEnd || 0;

    // Inserta el nuevo texto
    textField.value = currentText.substring(0, startPos) + 
                     text + 
                     currentText.substring(endPos);

    // Actualiza la posición del cursor
    const newCursorPos = startPos + text.length;
    textField.setSelectionRange(newCursorPos, newCursorPos);
  } else {
    // Para elementos textarea
    const startPos = textField.selectionStart;
    const endPos = textField.selectionEnd;
    const currentText = textField.value;

    textField.value = currentText.substring(0, startPos) + 
                     text + 
                     currentText.substring(endPos);

    const newCursorPos = startPos + text.length;
    textField.setSelectionRange(newCursorPos, newCursorPos);
  }

  // Dispara eventos necesarios para asegurar que el cambio sea detectado
  textField.dispatchEvent(new Event('input', { bubbles: true }));
  textField.dispatchEvent(new Event('change', { bubbles: true }));
  
  // Enfoca el campo de texto
  textField.focus();
}