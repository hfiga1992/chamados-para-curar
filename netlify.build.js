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

// Remove a pasta server se existir
const serverPath = path.join('dist', 'chamados-para-curar', 'server');
if (fs.existsSync(serverPath)) {
  console.log('Removendo pasta server...');
  try {
    fs.rmdirSync(serverPath, { recursive: true });
  } catch (error) {
    console.warn('Erro ao remover pasta server:', error);
  }
}

// Configura os redirecionamentos do Netlify
try {
  console.log('Configurando redirecionamentos do Netlify...');
  execSync('node setup-netlify.js', { stdio: 'inherit' });
} catch (error) {
  console.error('Erro ao configurar redirecionamentos:', error);
}

// Cria o arquivo netlify.toml na pasta de distribuição
try {
  console.log('Criando arquivo netlify.toml na pasta de distribuição...');
  const netlifyConfig = `
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
  force = true
`;
  fs.writeFileSync(path.join('dist', 'chamados-para-curar', 'netlify.toml'), netlifyConfig);
} catch (error) {
  console.error('Erro ao criar netlify.toml:', error);
}

console.log('Build concluído com sucesso!');
