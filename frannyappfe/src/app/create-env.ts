import * as fs from 'fs';
import * as dotenv from "dotenv";

dotenv.config();

const targetPath = './src/app/environment/env.ts';

const envConfigFile = `
export const environment = {
  production: false,
  baseUrl: '${process.env ['API_URL']}',
  defaultEmail: '${process.env ['DEFAULT_EMAIL']}',
  defaultPhone: '${process.env ['DEFAULT_PHONE_NUMBER']}',
  env: '${process.env ['ENV']}',

};
`;

// Write the environment file
fs.writeFileSync(targetPath, envConfigFile, { encoding: 'utf8' });




console.log(`Environment files generated at ${targetPath}`);

