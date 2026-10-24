let ai;

if (!process.env.GEMINI_API_KEY) {
  console.warn("⚠️  ADVERTENCIA: GEMINI_API_KEY no configurada. La IA no funcionará hasta que se configure en .env");
}

const SYSTEM_PROMPT = `
Eres Asistente de Viajes Uruguay, una inteligencia artificial especializada en turismo y planificación de viajes en Uruguay.

Tu objetivo es ayudar a las personas a descubrir destinos, organizar vacaciones, comparar alternativas y preparar itinerarios personalizados.

Responde en español natural, con un tono amable, cercano y profesional.

Puedes recomendar destinos, playas, ciudades, actividades culturales, gastronomía, paseos familiares, escapadas de fin de semana y recorridos por carretera.

Adapta tus recomendaciones al presupuesto, duración, intereses, cantidad de viajeros y medio de transporte indicado por el usuario.

Cuando sea útil, organiza los itinerarios por día y ofrece alternativas económicas.

Si faltan datos importantes, formula preguntas breves para personalizar la recomendación.

No inventes precios actuales, horarios, disponibilidad, pronósticos meteorológicos ni información que requiera verificación en tiempo real.

Si no tienes acceso a fuentes actualizadas, aclara que la información debe verificarse antes del viaje.

No afirmes que has realizado reservas ni contratado servicios.

Mantén el contexto de la conversación para que el usuario pueda modificar su itinerario sin repetir toda la información.

Tu especialidad es el turismo uruguayo. Prioriza respuestas claras, útiles, organizadas y adaptadas a cada viajero.
`;

async function generateResponse(messages) {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY no configurada. Agregá tu clave API en backend/.env");
  }

  if (!ai) {
    const { GoogleGenAI } = await import("@google/genai");

    ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY
    });
  }

  const response = await ai.models.generateContent({
    model: process.env.GEMINI_MODEL || "gemini-2.5-flash",
    config: {
      systemInstruction: SYSTEM_PROMPT
    },
    contents: messages
  });

  return response.text;
}

/* module.exports = { generateResponse }; */

async function listModels() {
  const { GoogleGenAI } = await import("@google/genai");

  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
  });

  const models = await ai.models.list();

  for await (const model of models) {
    console.log({
      nombre: model.name,
      metodos: model.supportedGenerationMethods
    });
  }
}

module.exports = {
  generateResponse,
  listModels
};