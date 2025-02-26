# Use a imagem oficial do Node.js
FROM node:18

# Define o diretório de trabalho no container
WORKDIR /app

# Copia os arquivos package.json e package-lock.json para instalar as dependências
COPY package*.json ./

# Instala as dependências
RUN npm install

# Desabilita verificação de SSL (apenas para desenvolvimento)
RUN npm config set strict-ssl false
RUN npm install dotenv --save


# Copia todos os arquivos do projeto para o container
COPY . .

# Expõe a porta que o backend usará
EXPOSE 5000

# Comando para iniciar a aplicação
CMD ["npm", "run", "dev"]
