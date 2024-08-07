# Usa una imagen base de Node.js
FROM node:16

# Establece el directorio de trabajo en el contenedor
WORKDIR /app

# Copia los archivos de la aplicación
COPY . .

# Instala las dependencias de la aplicación
RUN npm install

# Compila la aplicación si es necesario (por ejemplo, si usas TypeScript)
RUN npm run build

# Expone el puerto en el que la aplicación escuchará
EXPOSE 3001

# Inicia la aplicación
CMD ["npm", "start"]
