const express = require("express");
const { generateResponse } = require("../services/groq.service");

const router = express.Router();

const MAX_MESSAGES = 20;
const MAX_MESSAGE_LENGTH = 4000;

function validateMessages(messages) {
  if (!Array.isArray(messages) || messages.length === 0) {
    return { valid: false, error: "Se requiere un array de mensajes." };
  }

  for (const msg of messages) {
    if (!msg || typeof msg !== "object") {
      return { valid: false, error: "Cada mensaje debe ser un objeto." };
    }
    if (!msg.role || !["user", "assistant"].includes(msg.role)) {
      return { valid: false, error: "Rol de mensaje inválido. Use 'user' o 'assistant'." };
    }
    if (!msg.content || typeof msg.content !== "string") {
      return { valid: false, error: "El contenido del mensaje es requerido y debe ser texto." };
    }
    if (msg.content.length > MAX_MESSAGE_LENGTH) {
      return { valid: false, error: `El mensaje excede el límite de ${MAX_MESSAGE_LENGTH} caracteres.` };
    }
  }

  if (messages.length > MAX_MESSAGES) {
    return { valid: false, error: `El historial excede el límite de ${MAX_MESSAGES} mensajes.` };
  }

  if (messages[messages.length - 1].role !== "user") {
    return { valid: false, error: "El último mensaje debe ser del usuario." };
  }

  return { valid: true };
}

router.post("/", async (req, res) => {
  try {
    const { messages } = req.body;

    const validation = validateMessages(messages);
    if (!validation.valid) {
      return res.status(400).json({
        success: false,
        message: validation.error
      });
    }

    const response = await generateResponse(messages);

    res.json({
      success: true,
      response
    });

  } catch (error) {
    console.error("Error al consultar Groq:", error.message);

    res.status(500).json({
      success: false,
      message: "No se pudo obtener una respuesta de la IA."
    });
  }
});

module.exports = router;