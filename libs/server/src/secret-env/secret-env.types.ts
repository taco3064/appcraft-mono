enum SecretName {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  MONGODB_CONNECTION,
}

export type SecretEnvironment = Record<keyof typeof SecretName, string>;
