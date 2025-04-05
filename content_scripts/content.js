// Polyfill for browser compatibility
const runtime = (typeof browser !== 'undefined' && browser.runtime) || (typeof chrome !== 'undefined' && chrome.runtime);

if (!runtime) {
  console.error('No compatible runtime found. Ensure the extension is running in a supported browser.');
}

// Escucha mensajes del popup y del menú contextual
browser.runtime.onMessage.addListener((message) => {
  if (message.action === 'insertText') {
    insertTextIntoField(message.text);
  }
});

function insertTextIntoField(text) {
  const activeElement = document.activeElement;

  if (activeElement && (activeElement.tagName === 'TEXTAREA' || activeElement.tagName === 'INPUT' || activeElement.isContentEditable)) {
    if (activeElement.tagName === 'TEXTAREA' || activeElement.tagName === 'INPUT') {
      const inputField = activeElement;
      const startPos = inputField.selectionStart || 0;
      const endPos = inputField.selectionEnd || 0;
      const currentText = inputField.value;

      inputField.value = currentText.substring(0, startPos) + 
                       text + 
                       currentText.substring(endPos);

      const newCursorPos = startPos + text.length;
      inputField.setSelectionRange(newCursorPos, newCursorPos);
    } else if (activeElement.isContentEditable) {
      const selection = window.getSelection();
      if (selection && selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        range.deleteContents();
        range.insertNode(document.createTextNode(text));
      }
    }

    activeElement.dispatchEvent(new Event('input', { bubbles: true }));
    activeElement.dispatchEvent(new Event('change', { bubbles: true }));
    activeElement.focus();
  } else {
    console.error('No se encontró un campo de texto activo para insertar el texto.');
  }
}