/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Where lead forms POST. Unset means demo mode (validate, don't send). */
  readonly VITE_FORM_ENDPOINT?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
