# GamerIn
GamerIn es una red social orientada a la búsqueda de trabajo en el sector de los eSports. La aplicacion permitirá revisar ofertas de trabajo de distintas empresas y responder a ellas a través de un formulario.

![Travis Build Status](https://travis-ci.org/SyTW12018/E07.svg?branch=master)

# Planificación
La planificación es una parte importante de un desarrollo de una aplicación, puesto que determinará los objetivos y funcionalidades a desarrollar. Ésto nos permitirá determinar cuando nuestra aplicación estará lista y finalizada.

## Funcionalidades de GamerIn:
- Permitir la conexión de usuario
    - Registro de nuevos usuario
    - Login de usuarios

- Permitir cambiar la informacion del usuario
    - Cambiar contraseña
    - Cambiar email
    - Cambiar nombre
    - Desactivar cuenta

- Perfiles de Usuario y empresas
    - Ver perfiles de usuarios y empresas
    - Ver ofertas de empresa
    - Generar nuevas publicaciones

- Ofertas de empleo
    - Contactar para oferta


# Arquitectura de la Aplicación Web

Nuestra aplicación utilizará el Stack de desarrollo MEVN, es decir, el back-end estará bajo NodeJS junto a Express y como base de datos MongoDB; y el front-end usará el framework Vue.

Haremos uso de varias librerias en nuestra aplicación:
- Mongoose: Para la gestión de modelos de la base de datos.
- Dotenv: Para la gestión de las variables de conexión.
- bcrypt-nodejs: Para la encriptación de contraseñas.
- jwt-simple: Para la gestión de tokens de sesiones.
- moment: Para controlar y generar fechas de expiración para los tokens.
- Express: Para montar el servidor REST.

# Componentes del Grupo
- Alejandro González Alonso
- Lucía Muñoz González
- Kristian Martínez García
- Adrián Tomás Herrera Darias
