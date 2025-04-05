// Escucha mensajes del popup
browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'insertText') {
    insertTextIntoField(message.text);
  }
});

function insertTextIntoField(text) {
  // Selectores para los campos de texto en ChatGPT y Deepseek
  const selectors = [
    'textarea[data-id="root"]', // ChatGPT
    '#prompt-textarea', // ChatGPT alternativo
    '.chat-input textarea', // Deepseek
    '[role="textbox"]' // Selector genérico para campos de texto
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

  // Guarda la posición del cursor actual
  const startPos = textField.selectionStart;
  const endPos = textField.selectionEnd;

  // Obtiene el texto actual
  const currentText = textField.value;

  // Inserta el nuevo texto en la posición del cursor
  textField.value = currentText.substring(0, startPos) + 
                    text + 
                    currentText.substring(endPos);

  // Actualiza la posición del cursor después del texto insertado
  const newCursorPos = startPos + text.length;
  textField.setSelectionRange(newCursorPos, newCursorPos);

  // Dispara un evento de input para activar cualquier listener
  textField.dispatchEvent(new Event('input', { bubbles: true }));
  
  // Enfoca el campo de texto
  textField.focus();
}