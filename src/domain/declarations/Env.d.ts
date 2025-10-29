export interface IEnvironments {
  VITE_BASE_URL: string
}

declare global {
  namespace NodeJS {
    type ProcessEnv = IEnvironments
  }
}
