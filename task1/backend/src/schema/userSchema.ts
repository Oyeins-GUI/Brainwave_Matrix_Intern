export const userSchema = `
   CREATE TABLE IF NOT EXISTS users (
      id VARCHAR(255) UNIQUE NOT NULL,
      username VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      password VARCHAR(255) NOT NULL
      currency VARCHAR(3) DEFAULT NGN
   )
`;
