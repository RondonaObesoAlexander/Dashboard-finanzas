# 💰 Dashboard de Finanzas

Aplicación full-stack para seguimiento de finanzas personales construida con **Node.js**, **SQLite** y **JavaScript vanilla**. Incluye gráficos en tiempo real, seguimiento de presupuestos y gestión de transacciones con una API REST limpia.

## ✨ Características

- 📊 Gráficos interactivos (gastos por categoría, tendencias mensuales, evolución del patrimonio neto)
- 💳 CRUD de transacciones con filtrado, ordenamiento y paginación
- 🎯 Seguimiento de objetivos de presupuesto con indicadores de progreso
- 📈 Línea de tiempo del patrimonio neto y calculadora de tasa de ahorro
- 🔐 Autenticación JWT con tokens de refresco
- 🧪 Pruebas unitarias + de integración con cobertura superior al 80%
- 📝 Documentación de API autogenerada con Swagger UI

## 🛠️ Lista de Tecnologías  

| Capa           | Tecnología                                 |
|----------------|--------------------------------------------|
| Backend        | Node.js, Express, SQLite (better-sqlite3)  |
| Autenticación  | JWT (tokens de acceso + refresco)          |
| Frontend       | JavaScript vanilla, Chart.js, CSS Grid     |
| Pruebas        | Jest, Supertest                            |
| Documentación  | Swagger / OpenAPI 3.0                      |

## 🚀 Inicio rápido

```bash
# Clonar el repositorio
git clone https://github.com/RondonaObesoAlexander/Dashboard-finanzas.git
cd Dashboard-finanza

# Instalar dependencias
cd backend && npm install
cd ../frontend && npm install

# Sembrar la base de datos con datos de ejemplo
cd ../backend && npm run seed

# Iniciar el backend (puerto 3000)
npm run dev

# En otra terminal, servir el frontend
cd ../frontend && npm run dev
```

Abre http://localhost:5173 en tu navegador.

## 📁 Estructura del proyecto

```
Dashboard-finanzas/
├── backend/
│   ├── src/
│   │   ├── controllers/     # Manejadores de peticiones (capa delgada)
│   │   ├── models/          # Lógica de negocio + consultas a BD
│   │   ├── routes/          # Enrutadores de Express
│   │   ├── middleware/      # Autenticación, manejo de errores, validación
│   │   └── db/              # Esquema, migraciones, datos de prueba
│   └── tests/               # Suites de pruebas Jest
├── frontend/
│   └── src/
│       ├── components/      # Componentes UI reutilizables
│       ├── hooks/           # Hooks de gestión de estado
│       ├── pages/           # Vistas a nivel de página
│       └── utils/           # Cliente API, formateadores
└── docs/
    └── openapi.yaml         # Especificación de la API
```

## 🔌 Endpoints de la API

| Método | 	Ruta                      |   Descripción            |
|--------|----------------------------|--------------------------|
| POST   | `/auth/register`           | Crear cuenta             |
| POST   | `/auth/login`              | Obtener tokens JWT       |
| GET    | `/transactions`            | Listar con filtros +     |
|        |                            |           paginación     | 
| POST   | `/transactions`            | Crear transacción        |
| PUT    | `/transactions/:id`        | Actualizar transacción   |
| DELETE | `/transactions/:id`        | Eliminar transacción     |
| GET    | `/analytics/summary`       | Resumen mensual          |
| GET    | `/analytics/by-category`   | Gastos por categoría     |
| GET    | `/analytics/net-worth`     | Línea de tiempo del      |
|        |                            |       patrimonio neto    |
| GET    | `/budgets`                 | Obtener todos los        |
|        |                            |       presupuestos       |
| PUT    | `/budgets/:category`       | Actualizar objetivo de   |
|        |                            |        presupuesto       |

## 🧪 Ejecutar pruebas

```bash
cd backend
npm test              # Ejecutar todas las pruebas
npm run test:coverage # Con informe de cobertura
```

## 📸 Capturas de pantalla

Ver la carpeta /docs/screenshots/ para vistas previas de la interfaz.

## 🤝 Contribuciones

Las solicitudes de cambio son bienvenidas. Por favor, abre un issue primero para discutir cambios significativos.

## 📄 Licencia

MIT
