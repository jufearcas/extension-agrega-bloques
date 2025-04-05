// Crea un menú contextual para insertar bloques de texto
browser.contextMenus.create({
  id: "insert-block",
  title: "Insertar Bloque de Texto",
  contexts: ["editable"]
});

// Maneja clics en el menú contextual
browser.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "insert-block") {
    browser.tabs.sendMessage(tab.id, {
      action: "insertText",
      text: "Este es un bloque de texto predefinido."
    });
  }
});