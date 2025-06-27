const fs = require('fs');
const path = require('path');

// Certifica-se de que o diretório de destino existe
const distDir = path.join(__dirname, 'dist', 'chamados-para-curar');
if (!fs.existsSync(distDir)) {
  console.error('Diretório de distribuição não encontrado!');
  process.exit(1);
}

// Cria o arquivo _redirects no diretório de distribuição
const redirectsContent = '/*    /index.html   200';
fs.writeFileSync(path.join(distDir, '_redirects'), redirectsContent);
console.log('Arquivo _redirects criado com sucesso em: ' + path.join(distDir, '_redirects'));

// Verifica se o arquivo foi criado corretamente
if (fs.existsSync(path.join(distDir, '_redirects'))) {
  const content = fs.readFileSync(path.join(distDir, '_redirects'), 'utf8');
  console.log('Conteúdo do arquivo _redirects:', content);
} else {
  console.error('Falha ao criar arquivo _redirects!');
}
