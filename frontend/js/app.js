/* ========================================
   ASISTENTE DE VIAJES URUGUAY - BRUTALIST FRONTEND JS
   ======================================== */

// Configuración
const API_URL = '/api/chat';
const MAX_HISTORY = 20;

// Estado de la aplicación
const state = {
  messages: [],
  isLoading: false,
  conversationStarted: false
};

// Elementos del DOM
const elements = {};

// Datos de destinos con imágenes reales de Unsplash
const destinations = [
  {
    id: 'montevideo',
    name: 'MONTEVIDEO',
    description: 'La capital vibrante con su rambla de 22km, casco histórico, mercados y vida cultural intensa.',
    icon: 'map-pin',
    query: '¿Qué puedo visitar en Montevideo?',
    image: 'assets/images/montevideo.jpg',
    alt: 'Rambla de Montevideo al atardecer'
  },
  {
    id: 'punta-del-este',
    name: 'PUNTA DEL ESTE',
    description: 'El balneario más famoso con playas de la Brava y la Mansa, la Mano, casinos y vida nocturna.',
    icon: 'waves',
    query: 'Organizame un fin de semana en Punta del Este',
    image: 'assets/images/punta-del-este.jpg',
    alt: 'La Mano de Punta del Este en la playa Brava'
  },
  {
    id: 'colonia',
    name: 'COLONIA DEL SACRAMENTO',
    description: 'Ciudad colonial portuguesa declarada Patrimonio de la Humanidad, calles empedradas y atardeceres únicos.',
    icon: 'landmark',
    query: '¿Qué lugares puedo conocer en Colonia del Sacramento?',
    image: 'assets/images/colonia.jpg',
    alt: 'Calle empedrada del Barrio Histórico de Colonia'
  },
  {
    id: 'pira-polis',
    name: 'PIRIÁPOLIS',
    description: 'Balneario histórico con cerros, castillo, puerto y playas familiares en entorno natural.',
    icon: 'mountain',
    query: '¿Qué hacer en Piriápolis y alrededores?',
    image: 'assets/images/pira-polis.jpg',
    alt: 'Cerro San Antonio y Castillo de Piria en Piriápolis'
  },
  {
    id: 'la-paloma',
    name: 'LA PALOMA',
    description: 'Playas de arena fina, faro, surf y ambiente relajado en el corazón de la costa de Rocha.',
    icon: 'lighthouse',
    query: 'Quiero conocer las playas de La Paloma',
    image: 'assets/images/la-paloma.jpg',
    alt: 'Faro de La Paloma en la costa rocosa'
  },
  {
    id: 'punta-del-diablo',
    name: 'PUNTA DEL DIABLO',
    description: 'Pueblo de pescadores con playas salvajes, ambiente bohemio y acceso al Parque Nacional Santa Teresa.',
    icon: 'anchor',
    query: '¿Qué puedo hacer en Punta del Diablo?',
    image: 'assets/images/punta-del-diablo.jpg',
    alt: 'Playas de Punta del Diablo con barcos de pesca'
  },
  {
    id: 'cabo-polonio',
    name: 'CABO POLONIO',
    description: 'Parque nacional sin electricidad, lobos marinos, dunas móviles y faro en entorno único.',
    icon: 'tree-pine',
    query: '¿Cómo visitar Cabo Polonio y qué ver?',
    image: 'assets/images/cabo-polonio.jpg',
    alt: 'Dunas y faro de Cabo Polonio en el parque nacional'
  },
  {
    id: 'termas-dayman',
    name: 'TERMAS DEL DAYMÁN',
    description: 'Complejo termal en Salto con piscinas de agua caliente natural, ideal para relax y salud.',
    icon: 'droplets',
    query: '¿Qué ofrecen las Termas del Daymán en Salto?',
    image: 'assets/images/termas-dayman.jpg',
    alt: 'Piscinas termales de Termas del Daymán en Salto'
  }
];

// Mapeo de iconos a nombres de Lucide
const iconMap = {
  'map-pin': 'map-pin',
  'waves': 'waves',
  'landmark': 'landmark',
  'mountain': 'mountain',
  'lighthouse': 'lighthouse',
  'anchor': 'anchor',
  'tree-pine': 'tree-pine',
  'droplets': 'droplets',
  'calendar': 'calendar',
  'wallet': 'wallet',
  'cpu': 'cpu',
  'users': 'users',
  'message-square-diff': 'message-square-diff',
  'lock': 'lock',
  'compass': 'compass',
  'menu': 'menu',
  'send': 'send',
  'arrow-right': 'arrow-right',
  'message-square': 'message-square',
  'zap': 'zap',
  'shield-check': 'shield-check'
};

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
  cacheElements();
  initNavigation();
  initHeroButton();
  initSuggestions();
  initChatForm();
  initDestinations();
  initFooterYear();
  initSmoothScroll();
  
  // Inicializar iconos Lucide después de renderizar contenido dinámico
  setTimeout(() => {
    if (window.lucide) {
      lucide.createIcons();
    }
  }, 0);
});

function cacheElements() {
  elements.navToggle = document.querySelector('.nav-toggle');
  elements.navMenu = document.getElementById('nav-menu');
  elements.navLinks = document.querySelectorAll('.nav-link');
  elements.startChatBtn = document.getElementById('start-chat-btn');
  elements.chatSection = document.getElementById('chat-section');
  elements.messagesContainer = document.getElementById('messages');
  elements.chatForm = document.getElementById('chat-form');
  elements.messageInput = document.getElementById('message-input');
  elements.sendButton = document.getElementById('send-button');
  elements.suggestionsContainer = document.getElementById('suggestions');
  elements.suggestionButtons = document.querySelectorAll('.suggestion-btn');
  elements.destinationsGrid = document.getElementById('destinations-grid');
  elements.currentYear = document.getElementById('current-year');
}

// Navegación móvil
function initNavigation() {
  if (elements.navToggle && elements.navMenu) {
    elements.navToggle.addEventListener('click', () => {
      const isOpen = elements.navMenu.classList.toggle('open');
      elements.navToggle.setAttribute('aria-expanded', isOpen);
    });

    elements.navLinks.forEach(link => {
      link.addEventListener('click', () => {
        elements.navMenu.classList.remove('open');
        elements.navToggle.setAttribute('aria-expanded', 'false');
      });
    });

    document.addEventListener('click', (e) => {
      if (!elements.navToggle.contains(e.target) && !elements.navMenu.contains(e.target)) {
        elements.navMenu.classList.remove('open');
        elements.navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  window.addEventListener('scroll', updateActiveNavLink);
}

function updateActiveNavLink() {
  const sections = document.querySelectorAll('section[id]');
  const scrollPos = window.scrollY + 100;

  sections.forEach(section => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute('id');

    if (scrollPos >= top && scrollPos < top + height) {
      elements.navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
      });
    }
  });
}

// Botón "Comenzar conversación" en Hero
function initHeroButton() {
  if (elements.startChatBtn && elements.chatSection) {
    elements.startChatBtn.addEventListener('click', () => {
      elements.chatSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setTimeout(() => {
        elements.messageInput?.focus();
      }, 500);
    });
  }
}

// Sugerencias rápidas
function initSuggestions() {
  elements.suggestionButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const suggestion = btn.dataset.suggestion;
      if (suggestion) {
        sendUserMessage(suggestion);
      }
    });
  });
}

// Formulario de chat
function initChatForm() {
  if (elements.chatForm) {
    elements.chatForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const text = elements.messageInput.value.trim();
      if (text && !state.isLoading) {
        await sendUserMessage(text);
      }
    });
  }

  const chatContainer = document.querySelector('.chat-container');
  if (chatContainer) {
    chatContainer.addEventListener('click', (e) => {
      if (e.target === chatContainer || e.target.classList.contains('messages')) {
        elements.messageInput?.focus();
      }
    });
  }
}

// Enviar mensaje del usuario
async function sendUserMessage(text) {
  if (state.isLoading) return;

  addMessageToState('user', text);
  renderMessage('user', text);
  elements.messageInput.value = '';
  elements.messageInput.focus();

  showTypingIndicator();

  const history = prepareHistoryForAPI();

  try {
    state.isLoading = true;
    elements.sendButton.disabled = true;

    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: history })
    });

    const data = await response.json();
    hideTypingIndicator();

    if (!response.ok || !data.success) {
      throw new Error(data.message || 'Error del servidor');
    }

    addMessageToState('assistant', data.response);
    renderMessage('assistant', data.response);

    // Reinicializar iconos Lucide para cualquier nuevo icono en el markdown
    if (window.lucide) {
      lucide.createIcons();
    }

  } catch (error) {
    console.error('Error en chat:', error);
    hideTypingIndicator();
    renderMessage('assistant', 'LO SIENTO, NO PUDE CONECTAR CON EL ASISTENTE. POR FAVOR, INTENTÁ DE NUEVO MÁS TARDE.', true);
  } finally {
    state.isLoading = false;
    elements.sendButton.disabled = false;
  }
}

// Preparar historial para la API (últimos N mensajes)
function prepareHistoryForAPI() {
  const relevantMessages = state.messages.slice(-MAX_HISTORY);
  return relevantMessages.map(msg => ({
    role: msg.role,
    content: msg.content
  }));
}

// Agregar mensaje al estado interno
function addMessageToState(role, content) {
  state.messages.push({ role, content });
  state.conversationStarted = true;
  
  if (state.messages.length > MAX_HISTORY * 2) {
    state.messages = state.messages.slice(-MAX_HISTORY);
  }
}

// Renderizar mensaje en el DOM
function renderMessage(role, content, isError = false) {
  const welcome = elements.messagesContainer.querySelector('.welcome');
  if (welcome) {
    welcome.remove();
  }

  hideTypingIndicator();

  const messageEl = document.createElement('div');
  messageEl.classList.add('message', role);
  if (isError) messageEl.classList.add('error');
  
  if (role === 'assistant' && !isError) {
    messageEl.innerHTML = renderMarkdown(content);
  } else {
    messageEl.textContent = content;
  }
  
  elements.messagesContainer.appendChild(messageEl);
  scrollToBottom();
}

// Convertir markdown simple a HTML seguro
function renderMarkdown(text) {
  if (!text) return '';
  
  let html = escapeHtml(text);
  
  // Headers
  html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
  html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
  html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');
  
  // Bold
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/__(.+?)__/g, '<strong>$1</strong>');
  
  // Italic
  html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');
  html = html.replace(/_(.+?)_/g, '<em>$1</em>');
  
  // Code inline
  html = html.replace(/`(.+?)`/g, '<code>$1</code>');
  
  // Lists
  html = html.replace(/^\- (.*$)/gim, '<li>$1</li>');
  html = html.replace(/^\* (.*$)/gim, '<li>$1</li>');
  html = html.replace(/(<li>.*<\/li>\n?)+/g, (match) => '<ul>' + match + '</ul>');
  
  html = html.replace(/^\d+\. (.*$)/gim, '<li>$1</li>');
  html = html.replace(/(<li>.*<\/li>\n?)+/g, (match) => '<ol>' + match + '</ol>');
  
  // Line breaks
  html = html.replace(/\n/g, '<br>');
  
  // Paragraphs
  html = html.replace(/(<br>\s*)+/g, '</p><p>');
  html = '<p>' + html + '</p>';
  
  // Clean up
  html = html.replace(/<p>\s*<\/p>/g, '');
  html = html.replace(/<p>\s*(<h[1-3]>)/g, '$1');
  html = html.replace(/(<\/h[1-3]>)\s*<\/p>/g, '$1');
  html = html.replace(/<p>\s*(<ul>)/g, '$1');
  html = html.replace(/(<\/ul>)\s*<\/p>/g, '$1');
  html = html.replace(/<p>\s*(<ol>)/g, '$1');
  html = html.replace(/(<\/ol>)\s*<\/p>/g, '$1');
  html = html.replace(/<p>\s*(<li>)/g, '$1');
  html = html.replace(/(<\/li>)\s*<\/p>/g, '$1');
  
  return html;
}

// Indicador de "escribiendo..."
function showTypingIndicator() {
  hideTypingIndicator();
  
  const typingEl = document.createElement('div');
  typingEl.className = 'typing-indicator';
  typingEl.id = 'typing-indicator';
  typingEl.innerHTML = '<span></span><span></span><span></span>';
  typingEl.setAttribute('aria-label', 'El asistente está escribiendo');
  
  elements.messagesContainer.appendChild(typingEl);
  scrollToBottom();
}

function hideTypingIndicator() {
  const typing = document.getElementById('typing-indicator');
  if (typing) typing.remove();
}

// Scroll suave al final
function scrollToBottom() {
  requestAnimationFrame(() => {
    elements.messagesContainer.scrollTop = elements.messagesContainer.scrollHeight;
  });
}

// Inicializar destinos con imágenes reales
function initDestinations() {
  if (!elements.destinationsGrid) return;

  elements.destinationsGrid.innerHTML = destinations.map(dest => {
    const iconName = iconMap[dest.icon] || 'map-pin';
    return `
      <article class="destination-card" data-destination="${dest.id}" role="listitem">
        <div class="destination-image">
          <img src="${dest.image}" alt="${dest.alt}" loading="lazy">
          <div class="destination-overlay"></div>
        </div>
        <div class="destination-content">
          <h3>${dest.name}</h3>
          <p>${dest.description}</p>
          <button type="button" class="destination-btn" data-query="${escapeHtml(dest.query)}">
            <span data-lucide="arrow-right"></span>
            CONSULTAR AL ASISTENTE
          </button>
        </div>
      </article>
    `;
  }).join('');

  // Event listeners para botones de destino
  elements.destinationsGrid.querySelectorAll('.destination-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const query = btn.dataset.query;
      if (query) {
        elements.chatSection?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setTimeout(() => {
          sendUserMessage(query);
        }, 500);
      }
    });
  });

  // Reinicializar iconos Lucide para las tarjetas nuevas
  if (window.lucide) {
    lucide.createIcons();
  }
}

// Escape HTML para prevenir XSS
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// Año actual en footer
function initFooterYear() {
  if (elements.currentYear) {
    elements.currentYear.textContent = new Date().getFullYear();
  }
}

// Smooth scroll para enlaces internos
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        history.pushState(null, '', targetId);
        updateActiveNavLink();
      }
    });
  });
}

// Manejo de errores global
window.addEventListener('error', (e) => {
  console.error('Error global:', e.error);
});

window.addEventListener('unhandledrejection', (e) => {
  console.error('Promise rechazada:', e.reason);
});