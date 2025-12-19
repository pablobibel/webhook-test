/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_N8N_CHAT_WEBHOOK_URL?: string;
  // add more `VITE_` variables here as needed
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
