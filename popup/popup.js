document.addEventListener('DOMContentLoaded', () => {
  loadBlocks();
  document.getElementById('saveBlock').addEventListener('click', saveNewBlock);
});

function saveNewBlock() {
  const text = document.getElementById('newBlock').value.trim();
  const name = document.getElementById('blockName').value.trim();
  
  if (!text || !name) {
    alert('Por favor ingresa tanto el texto como el nombre del bloque');
    return;
  }

  browser.storage.local.get('blocks').then(result => {
    const blocks = result.blocks || {};
    blocks[name] = text;
    browser.storage.local.set({ blocks }).then(() => {
      document.getElementById('newBlock').value = '';
      document.getElementById('blockName').value = '';
      loadBlocks();
    });
  });
}

function loadBlocks() {
  const blocksList = document.getElementById('blocksList');
  blocksList.innerHTML = '';

  browser.storage.local.get('blocks').then(result => {
    const blocks = result.blocks || {};
    
    Object.entries(blocks).forEach(([name, text]) => {
      const blockDiv = document.createElement('div');
      blockDiv.className = 'block-item';
      
      const nameSpan = document.createElement('strong');
      nameSpan.textContent = name;
      
      const insertButton = document.createElement('button');
      insertButton.textContent = 'Insertar';
      insertButton.onclick = () => insertBlock(text);
      
      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Eliminar';
      deleteButton.onclick = () => deleteBlock(name);
      
      blockDiv.appendChild(nameSpan);
      blockDiv.appendChild(insertButton);
      blockDiv.appendChild(deleteButton);
      blocksList.appendChild(blockDiv);
    });
  });
}

function insertBlock(text) {
  browser.tabs.query({active: true, currentWindow: true}).then(tabs => {
    browser.tabs.sendMessage(tabs[0].id, {
      action: 'insertText',
      text: text
    });
  });
}

function deleteBlock(name) {
  if (confirm(`¿Estás seguro de que quieres eliminar el bloque "${name}"?`)) {
    browser.storage.local.get('blocks').then(result => {
      const blocks = result.blocks || {};
      delete blocks[name];
      browser.storage.local.set({ blocks }).then(loadBlocks);
    });
  }
}