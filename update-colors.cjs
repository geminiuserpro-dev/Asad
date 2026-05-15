const fs = require('fs');
const path = require('path');

const filesToProcess = [
  'src/styles/dashboard.css',
  'src/styles/editor.css',
  'src/styles/preview-modes.css',
  'src/styles/project-menu.css',
  'src/styles/analytics.css',
  'src/styles/share-menu.css'
];

const colorMap = {
  '#0c0c0c': '#09090b',
  '#131314': '#18181b',
  '#1f1f22': '#27272a',
  '#1c1c1e': '#18181b',
  '#141415': '#18181b',
  '#2a2a2a': '#27272a',
  '#333333': '#3f3f46',
  '#333;': '#3f3f46;',
  '#333 ': '#3f3f46 ',
  '#222222': '#27272a',
  '#222;': '#27272a;',
  '#222 ': '#27272a ',
  '#111111': '#09090b',
  '#111;': '#09090b;',
  '#111 ': '#09090b ',
  '#252525': '#18181b',
  '#1e1e1e': '#18181b',
  '#1e1e24': '#18181b',
  '#18181a': '#18181b',
};

filesToProcess.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    for (const [oldColor, newColor] of Object.entries(colorMap)) {
      content = content.replace(new RegExp(oldColor, 'gi'), newColor);
    }
    fs.writeFileSync(filePath, content);
    console.log(`Updated ${file}`);
  }
});
