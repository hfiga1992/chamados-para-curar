const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('Iniciando build personalizado para o Netlify...');

// Executa o build sem SSR
try {
  console.log('Executando build do Angular...');
  execSync('npx --no-install @angular/cli build --configuration=production', { stdio: 'inherit' });
} catch (error) {
  console.error('Erro durante o build:', error);
  process.exit(1);
}

// Copia o arquivo _redirects
try {
  console.log('Copiando arquivo _redirects...');
  fs.copyFileSync('_redirects', path.join('dist', 'chamados-para-curar', '_redirects'));
} catch (error) {
  console.log('Arquivo _redirects não encontrado, criando um novo...');
  fs.writeFileSync(
    path.join('dist', 'chamados-para-curar', '_redirects'),
    '/* /index.html 200'
  );
}

// Remove a pasta server se existir
const serverPath = path.join('dist', 'chamados-para-curar', 'server');
if (fs.existsSync(serverPath)) {
  console.log('Removendo pasta server...');
  fs.rmdirSync(serverPath, { recursive: true });
}

console.log('Build concluído com sucesso!');
