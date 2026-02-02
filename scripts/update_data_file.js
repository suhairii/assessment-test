const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../src/data/disc-data.ts');
const jsonPath = path.join(__dirname, '../src/data/generated-descriptions.json');

const dataContent = fs.readFileSync(dataPath, 'utf8');
const newDescriptions = fs.readFileSync(jsonPath, 'utf8');

// Find the start of personalityDescriptions
const startMarker = 'export const personalityDescriptions';
const endMarker = 'export const discQuestions';

const startIndex = dataContent.indexOf(startMarker);
const endIndex = dataContent.indexOf(endMarker);

if (startIndex === -1 || endIndex === -1) {
  console.error('Could not find markers');
  process.exit(1);
}

const before = dataContent.substring(0, startIndex);
const after = dataContent.substring(endIndex);

const newContent = before + 
  `export const personalityDescriptions: Record<string, any> = ${newDescriptions};\n\n` + 
  after;

fs.writeFileSync(dataPath, newContent, 'utf8');
console.log('Updated disc-data.ts');

