const fs = require('fs');
const path = require('path');

const propPath = path.join(__dirname, '../src/data/lang_in.properties');
const content = fs.readFileSync(propPath, 'utf8');

const lines = content.split('\n');
const result = {};

lines.forEach(line => {
  line = line.trim();
  if (!line || line.startsWith('#')) return;

  const parts = line.split('=');
  const key = parts[0].trim();
  const value = parts.slice(1).join('=').trim();

  // Pattern: ProfileName.Type.Key
  // e.g. Analyzer7.keystrength.1
  // e.g. Analyzer7.tendencies.goal
  
  const match = key.match(/^([a-zA-Z]+\d+)\.([a-zA-Z]+)\.(.+)$/);
  if (match) {
    const rawProfile = match[1];
    const category = match[2];
    const subKey = match[3];

    // Convert Analyzer7 -> Analyzer #7
    const nameMatch = rawProfile.match(/^([a-zA-Z]+)(\d+)$/);
    const profileName = nameMatch ? `${nameMatch[1]} #${nameMatch[2]}` : rawProfile;

    if (!result[profileName]) {
      result[profileName] = {
        strength: [],
        improve: [],
        tendencies: {}
      };
    }

    if (category === 'keystrength') {
      result[profileName].strength.push(value);
    } else if (category === 'improve') {
      result[profileName].improve.push(value);
    } else if (category === 'tendencies') {
      // Clean prefixes
      let cleanValue = value;
      const prefixes = [
        "TUJUAN:", "MENILAI ORANG LAIN DENGAN:", "MEMPENGARUHI ORANG LAIN DENGAN:",
        "NILAI TERHADAP ORGANISASI:", "BERLEBIHAN MENGGUNAKAN:", "KETIKA DI BAWAH TEKANAN:",
        "KETAKUTAN:"
      ];
      
      for (const prefix of prefixes) {
        if (cleanValue.startsWith(prefix)) {
          cleanValue = cleanValue.substring(prefix.length).trim();
          break;
        }
      }
      result[profileName].tendencies[subKey] = cleanValue;
    }
  }
});

console.log(JSON.stringify(result, null, 2));
