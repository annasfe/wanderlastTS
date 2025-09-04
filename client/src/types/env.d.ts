/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ACCESS_KEY: string;
  readonly VITE_DEFAULT_IMG: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
