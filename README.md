# Asistente de Viajes Uruguay 🇺🇾

Una aplicación web para conversar con una inteligencia artificial especializada en turismo uruguayo. Planificá tus viajes, descubrí destinos y recibí recomendaciones personalizadas.

## Características

- **Chat con IA especializada**: Asistente turístico experto en Uruguay (Google Gemini)
- **Historial conversacional**: La IA recuerda el contexto de la conversación
- **Sugerencias rápidas**: Botones predefinidos para consultas comunes
- **Destinos destacados**: 8 destinos uruguayos con tarjetas informativas
- **Diseño responsive**: Funciona en móvil, tablet y escritorio
- **Seguridad**: API key solo en backend, validación de entradas, rate limiting básico

## Tecnologías

- **Frontend**: HTML5, CSS3, JavaScript vanilla (ES6+)
- **Backend**: Node.js, Express.js
- **IA**: Google Gemini API (@google/genai)
- **Fuente**: Inter (Google Fonts)

## Estructura del proyecto

```
chat-ia/
├── backend/
│   ├── src/
│   │   ├── app.js              # Servidor Express + static files
│   │   ├── routes/
│   │   │   └── chat.routes.js  # POST /api/chat
│   │   └── services/
│   │       └── gemini.service.js  # Integración con Gemini
│   ├── .env.example
│   └── package.json
├── frontend/
│   ├── index.html              # Página principal completa
│   ├── css/
│   │   └── styles.css          # Estilos Uruguay theme
│   └── js/
│       └── app.js              # Lógica del frontend
├── .gitignore
└── README.md
```

## Requisitos

- Node.js 18+
- npm
- Cuenta en Google AI Studio para obtener API key de Gemini

## Instalación

```bash
# Clonar el repositorio
git clone https://github.com/Gastooonnn/chat-ia
cd chat-ia

# Backend
cd backend
npm install

# Configurar variables de entorno
cp .env.example .env
# Editar .env y agregar tu GEMINI_API_KEY
```

## Configuración

Crear archivo `backend/.env` basado en `.env.example`:

```env
PORT=3000
GEMINI_API_KEY=tu_clave_api_aqui
GEMINI_MODEL=gemini-2.5-flash
```

### Obtener API Key de Gemini

1. Ir a [Google AI Studio](https://aistudio.google.com/)
2. Iniciar sesión con cuenta de Google
3. Crear nueva API key
4. Copiar y pegar en `backend/.env`

## Ejecución

```bash
# Desde la carpeta backend
npm start
# o para desarrollo con auto-reload
npm run dev
```

La aplicación estará disponible en `http://localhost:3000`

## API Endpoint

### POST /api/chat

Envía historial de conversación y recibe respuesta de la IA.

**Request:**
```json
{
  "messages": [
    { "role": "user", "content": "Quiero visitar Montevideo" },
    { "role": "assistant", "content": "Montevideo es la capital..." },
    { "role": "user", "content": "¿Qué playas recomiendan?" }
  ]
}
```

**Response:**
```json
{
  "success": true,
  "response": "Para playas en Montevideo..."
}
```

**Validaciones:**
- Máximo 20 mensajes en el historial
- Máximo 4000 caracteres por mensaje
- Roles permitidos: `user`, `assistant`, `system`

## Seguridad implementada

- API key solo en variables de entorno del backend
- Validación estricta de payload (tamaño, estructura, roles)
- Límite de historial de conversación
- Sanitización de salida en frontend (textContent)
- CORS configurado
- Rate limiting básico (body-parser limit 1mb)

## Personalización

### Cambiar modelo de IA
Editar `GEMINI_MODEL` en `.env` (ej: `gemini-2.5-pro`)

### Modificar prompt del sistema
Editar `SYSTEM_PROMPT` en `backend/src/services/gemini.service.js`

### Agregar/quitar destinos
Modificar array `destinations` en `frontend/js/app.js`

### Cambiar colores
Modificar variables CSS en `:root` en `frontend/css/styles.css`

## Licencia

ISC