
# Compilacao do projeto
FROM node:20-alpine AS builder

# Pasta de trabalho dentro do container
WORKDIR /app

#Copiamos apenas os arquivos de dependência primeiro (para aproveitar o cache do Docker)
COPY package.json package-lock.json ./

#Instalando 
RUN npm install

#Copiando o codigo para a aplicacao
COPY . .

# Gera a pasta /app/dist com o código minificado
RUN npm run build


# ESTÁGIO 2:  

# Iniciando uma nova imagem 
FROM nginx:alpine

#Copiando a pasta "dist" para a pasta pública do NGINX
COPY --from=builder /app/dist /usr/share/nginx/html

# Abrindo a porta padrão do NGINX
EXPOSE 80

# Comando para manter o NGINX rodando
CMD ["nginx", "-g", "daemon off;"]