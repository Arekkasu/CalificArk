# 📚 El Califacainador (CalificArk)

**El Califacainador**, también conocido como **CalificArk**, es una aplicación web pensada para empoderar a los estudiantes universitarios, permitiéndoles consultar, calificar y comentar sobre los profesores de su universidad.

Actualmente, el acceso a esta información no es público y requiere solicitudes en jefatura. Este proyecto busca cambiar eso, haciendo más accesible y transparente la evaluación docente.

> 🚧 Actualmente en desarrollo: esta es la parte del backend. El frontend será implementado próximamente.

---

## ⚙️ Tecnologías Utilizadas

**Lenguaje y Entorno**
- [Node.js](https://nodejs.org/) + [TypeScript](https://www.typescriptlang.org/)
- [Express](https://expressjs.com/)

**ORM y Base de Datos**
- [Prisma ORM](https://www.prisma.io/)
- [PostgreSQL](https://www.postgresql.org/)

**Autenticación y Seguridad**
- `bcrypt` (encriptación de contraseñas)
- `jsonwebtoken` (tokens JWT)
- `dotenv` y `env-var` (manejo seguro de variables de entorno)

**Correo**
- `nodemailer` (envío de correos de verificación)

**Herramientas de Desarrollo**
- `ts-node-dev` y `nodemon` (hot-reloading)
- `rimraf` (limpieza de build)
- `ts-node` (ejecución de TypeScript)

---

## 🧱 Arquitectura del Proyecto

Este backend está estructurado siguiendo principios de **Clean Architecture** y **Domain-Driven Design (DDD)**. Las responsabilidades están separadas por capas:

- **`config/`**: Configuraciones globales reutilizables (bcrypt, JWT, variables de entorno).
- **`data/postgres/`**: Configuración y conexión con PostgreSQL. Punto de acceso a datos reales.
- **`domain/`**: Capa del negocio, incluye:
  - Entidades
  - DTOs (Data Transfer Objects)
  - Datasources (contratos de acceso a datos)
  - Repositorios (lógica del dominio)
- **`infrastructure/`**: Implementación concreta de los contratos definidos en `domain`.
- **`presentation/`**: Capa pública del backend. Organiza:
  - Rutas (endpoints)
  - Controladores
  - Servicios como autenticación y envío de correos

---

## ✅ Progreso

### 🗄️ Base de Datos

- [x] MER de las tablas
- [x] Creación de tablas


![Er Diagram](./docs/database.png)


### 🔧 Funcionalidades

#### 👨‍🎓 Registro de Estudiantes
- [ ] Validación de datos
- [ ] Encriptación de contraseña
- [ ] Creación de usuario
- [ ] Envío de correo de verificación

#### 🔐 Login de Estudiantes
- [ ] Implementar autenticación segura

#### 👨‍🏫 Calificación de Profesores
- [ ] Review con estrellas
- [ ] Comentario opcional en la review
- [ ] Filtro de comentarios

#### 📘 Registro de Materias
- [ ] Registrar materias disponibles
- [ ] Filtrado de materias registradas

---

## 🔐 Plantilla de Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto con el siguiente contenido:

```env
# Base de Datos
DATABASE_URL="postgresql://USUARIO:CONTRASEÑA@localhost:5432/NOMBRE_DB?schema=public"

# Configuración de Correo
SERVERMAIL="smtp"
PORT_ONE=
PORT_TWO=
USERNAME_MAIL="tu_correo"
PASSWORD_MAIL="tu_password_de_aplicacion"

# JWT
JWT_SECRET="una_clave_secreta_segura"
```

---


## 🗓️ Fecha Estimada de Finalización

El desarrollo está estimado para **mediados o finales de 2025**.

---

## ✨ Contribuciones

Este proyecto es de código abierto. Si te interesa contribuir o dar feedback, ¡bienvenido/a!

---

## 📬 Contacto

Si tienes preguntas o sugerencias, puedes escribir a:
📧 **arekkasu@proton.me**

---
