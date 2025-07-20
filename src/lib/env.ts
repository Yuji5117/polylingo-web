const getEnv = (name: string) => {
  const value = process.env[name];
  if (!value) {
    throw new Error(`❌ Missing required environment variable: ${name}`);
  }

  return value;
};

export const env = {
  API_KEY: getEnv("API_KEY"),
  TRANSLATION_API_KEY: getEnv("TRANSLATION_API_KEY"),
};
