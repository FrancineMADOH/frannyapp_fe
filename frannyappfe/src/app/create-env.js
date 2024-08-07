"use strict";
exports.__esModule = true;
var fs = require("fs");
var dotenv = require("dotenv");
dotenv.config();
var targetPath = './src/app/environment/env.ts';
var envConfigFile = "\nexport const environment = {\n  production: false,\n  baseUrl: '".concat(process.env['API_URL'], "',\n};\n");
// Write the environment file
fs.writeFileSync(targetPath, envConfigFile, { encoding: 'utf8' });
console.log("Environment files generated at ".concat(targetPath));
