# 💰 Dashboard de Finanzas

## 🚀 Inicio rápido

```bash
# Clonar el repositorio
git clone https://github.com/tu-usuario/finance-dashboard.git
cd finance-dashboard

# Instalar dependencias
cd backend && npm install
cd ../frontend && npm install

# Sembrar la base de datos con datos de ejemplo
cd ../backend && npm run seed

# Iniciar el backend (puerto 3000)
npm run dev
En otra terminal, servir el frontend:

bash
cd ../frontend && npm run dev
Abre http://localhost:5173 en tu navegador.

📁 Estructura del proyecto
text
finance-dashboard/
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

🔌 Endpoints de la API
Método	Ruta	Descripción
POST	/auth/register	Crear cuenta
POST	/auth/login	Obtener tokens JWT
GET	/transactions	Listar con filtros + paginación
POST	/transactions	Crear transacción
PUT	/transactions/:id	Actualizar transacción
DELETE	/transactions/:id	Eliminar transacción
GET	/analytics/summary	Resumen mensual
GET	/analytics/by-category	Gastos por categoría
GET	/analytics/net-worth	Línea de tiempo del patrimonio neto
GET	/budgets	Obtener todos los presupuestos
PUT	/budgets/:category	Actualizar objetivo de presupuesto

🧪 Ejecutar pruebas
bash
cd backend
npm test              # Ejecutar todas las pruebas
npm run test:coverage # Con informe de cobertura

📸 Capturas de pantalla
Ver la carpeta /docs/screenshots/ para vistas previas de la interfaz.

🤝 Contribuciones
Las solicitudes de cambio son bienvenidas. Por favor, abre un issue primero para discutir cambios significativos.

📄 Licencia
MIT
