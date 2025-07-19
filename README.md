# 🏋️‍♀️ GymAccess App

Plataforma para control de ingreso a gimnasios mediante código QR y reconocimiento facial.  
Incluye autenticación con JWT, control de roles (admin/user), registro de asistencias y paneles diferenciados.

---

## 📦 Tecnologías utilizadas

- **Node.js** + Express → Backend REST API
- **PostgreSQL** → Base de datos relacional
- **JWT (jsonwebtoken)** → Autenticación por token
- **bcrypt** → Hasheo seguro de contraseñas
- **React (próximo paso)** → Frontend
- **Docker (futuro)** → Contenedores para despliegue

---

## 📐 Arquitectura

- `/config` → Configuración de base de datos (PostgreSQL)
- `/controllers` → Lógica de negocio (register, login, etc.)
- `/routes` → Definición de endpoints
- `/middleware` → Middlewares de autenticación y autorización
- `.env` → Variables de entorno (no subir a producción)

---

## 🚀 Funcionalidades actuales

✅ Registro de usuarios  
✅ Login que devuelve token JWT  
✅ Acceso a panel privado (dashboard)  
✅ Protección de rutas con middlewares  
✅ Control de rol (admin / user)

---

## 📌 Endpoints disponibles

| Método | Ruta                    | Descripción                                      | Protegido | Rol requerido |
|-------|-------------------------|--------------------------------------------------|-----------|---------------|
| POST  | `/api/register`        | Registrar nuevo usuario                          | ❌        | -             |
| POST  | `/api/login`           | Iniciar sesión y obtener token                   | ❌        | -             |
| GET   | `/api/admin-panel`     | Acceso a panel de administración                 | ✅        | admin         |
| GET   | `/api/dashboard`       | Panel privado para cualquier usuario autenticado  | ✅        | user o admin  |

> ⚠ Para las rutas protegidas, usar header:
> ```
> Authorization: Bearer TU_TOKEN
> ```

---

## ⚙️ Variables de entorno

Crear un archivo `.env` en la raíz con:

```env
DATABASE_URL=postgresql://gymuser:1234@localhost:5432/gymaccess
JWT_SECRET=mitokensecreto
PORT=5000

### Instalación local
# 1. Clonar el repositorio
git clone https://github.com/florencialucero11/gymaccess-app.git
cd gymaccess-app

# 2. Instalar dependencias
npm install

# 3. Configurar base de datos
# Asegurate de tener PostgreSQL corriendo y la base de datos gymaccess creada.
# Crear tabla users:
psql -U postgres -d gymaccess -c "
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(100) NOT NULL,
  role VARCHAR(20) DEFAULT 'user'
);
"

# 4. Iniciar servidor en desarrollo
npm run dev
