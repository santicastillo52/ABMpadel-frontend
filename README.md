# 🏓 AB Padel - Frontend

Una aplicación web moderna para la gestión de canchas de pádel, desarrollada con React, TypeScript y Vite.

## 🌐 Demo en Vivo

Puedes ver la aplicación funcionando en: [https://ab-mpadel-frontend.vercel.app/](https://ab-mpadel-frontend.vercel.app/)

## 🚀 Características

- **Gestión de Canchas**: Visualización, creación, edición y eliminación de canchas de pádel
- **Interfaz Moderna**: Diseño responsive con Ant Design y Bootstrap
- **Navegación Intuitiva**: Sistema de rutas con React Router
- **Formularios Avanzados**: Validación con Formik y Yup
- **Gestión de Estado**: React Query para el manejo de datos del servidor
- **Subida de Imágenes**: Soporte para imágenes de canchas
- **Estados de Disponibilidad**: Control visual del estado de las canchas

## 🛠️ Tecnologías Utilizadas

- **Frontend Framework**: React 19.1.1
- **Lenguaje**: TypeScript
- **Build Tool**: Vite 7.1.2
- **UI Library**: Ant Design 5.27.2
- **Styling**: Bootstrap 5.3.8 + CSS personalizado
- **Routing**: React Router DOM 7.8.2
- **State Management**: TanStack React Query 5.85.9
- **Forms**: Formik 2.4.6 + Yup 1.7.0
- **HTTP Client**: Axios 1.11.0
- **Icons**: Ant Design Icons 6.0.1

## 📁 Estructura del Proyecto

```
src/
├── api/                    # Servicios de API
│   └── courtsAPI.ts       # Endpoints para canchas
├── components/            # Componentes reutilizables
│   ├── Header/           # Barra de navegación
│   └── Names/            # Componente de nombres
├── features/             # Funcionalidades principales
│   └── Courts/           # Módulo de canchas
│       ├── Court-card/   # Tarjeta de cancha
│       ├── Court-detail/ # Detalle de cancha
│       ├── Court-edit/   # Edición de cancha
│       ├── Court-form/   # Formulario de cancha
│       ├── Court-gestor/ # Gestor de canchas
│       └── Courts-Container/ # Contenedor de canchas
├── layouts/              # Layouts de página
│   └── Dashboard.tsx     # Layout principal
├── models/               # Modelos de datos
│   └── court.model.ts    # Interfaz de cancha
├── environment/          # Configuración de entorno
│   └── environment.ts    # Variables de entorno
└── main.tsx             # Punto de entrada
```

## 🚀 Instalación y Configuración

### Prerrequisitos

- Node.js (versión 16 o superior)
- npm o yarn

### Pasos de Instalación

1. **Clonar el repositorio**
   ```bash
   git clone <url-del-repositorio>
   cd frontend
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno**
   
   Edita el archivo `src/environment/environment.ts`:
   ```typescript
   export const environment = {
     production: true,
     apiUrl: 'https://abmpadel-backend.onrender.com' // URL del backend
   };
   ```

4. **Ejecutar en modo desarrollo**
   ```bash
   npm run dev
   ```

5. **Abrir en el navegador**
   
   La aplicación estará disponible en `http://localhost:5173`

## 📜 Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm run preview` - Previsualiza la build de producción
- `npm run lint` - Ejecuta el linter de ESLint

## 🎯 Funcionalidades Principales

### Dashboard
- Vista principal con todas las canchas disponibles
- Tarjetas interactivas con información de cada cancha
- Filtros por disponibilidad

### Gestión de Canchas
- **Crear**: Formulario para agregar nuevas canchas
- **Ver Detalle**: Información completa de cada cancha
- **Editar**: Modificar datos existentes
- **Eliminar**: Remover canchas del sistema

### Características de las Canchas
- Nombre de la cancha
- Tipo de cancha
- Tipo de pared
- Imagen representativa
- Estado de disponibilidad
- Horarios de funcionamiento

## 🔗 API Backend

La aplicación se conecta con el backend en: `https://abmpadel-backend.onrender.com`

### Endpoints Utilizados
- `GET /courts` - Obtener todas las canchas
- `GET /court/:id` - Obtener cancha específica
- `POST /court` - Crear nueva cancha
- `PUT /court/:id` - Actualizar cancha
- `DELETE /court/:id` - Eliminar cancha

## 🚀 Despliegue

La aplicación está desplegada en Vercel y se actualiza automáticamente con cada push a la rama `main`.

### URL de Producción
[https://ab-mpadel-frontend.vercel.app/](https://ab-mpadel-frontend.vercel.app/)



