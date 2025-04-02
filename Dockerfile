# Usa uma imagem Node.js 20 como base
FROM node:20-alpine

# Define o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copia os arquivos package.json e package-lock.json (ou yarn.lock)
COPY package*.json ./

# Instala as dependências do projeto
RUN npm install

# Copia o restante dos arquivos do projeto
COPY . .

# Constrói o aplicativo Ionic
RUN npm run build

# Instala o serve para servir os arquivos estáticos
RUN npm install -g serve

# Expõe a porta em que o aplicativo será executado
EXPOSE 8080

# Define o comando para iniciar o aplicativo
CMD ["serve", "-s", "dist", "-l", "8080"]