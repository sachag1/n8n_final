import { createChat } from 'https://cdn.jsdelivr.net/npm/@n8n/chat/dist/chat.bundle.es.js';

// paste here the production url of the Chat Trigger node
const WEBHOOK_URL = 'http://localhost:5678/webhook/PUT_YOUR_WEBHOOK_ID_HERE/chat';

const init = () => {
  createChat({
    webhookUrl: WEBHOOK_URL,
    webhookConfig: {
      method: 'POST',
      headers: {}
    },
    target: '#n8n-chat',
    mode: 'fullscreen',
    chatInputKey: 'chatInput',
    chatSessionKey: 'sessionId',
    loadPreviousSession: true,
    metadata: {},
    showWelcomeScreen: false,
    defaultLanguage: 'en',
    initialMessages: [
      'שלום! אני הסוכן של Lore. אפשר לשאול אותי על המסלולים, על המנוי ועל התשלום.'
    ],
    i18n: {
      en: {
        title: 'הסוכן של Lore',
        subtitle: 'כל שאלה על המסלולים, המנוי והתשלום',
        footer: '',
        inputPlaceholder: 'כתבו כאן את השאלה'
      }
    },
    enableStreaming: false
  });
}

init();
