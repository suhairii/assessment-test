import fs from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'src', 'data');
const DB_FILE = path.join(DATA_DIR, 'db.json');
const TOKENS_FILE = path.join(DATA_DIR, 'tokens.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Initialize files if they don't exist
if (!fs.existsSync(DB_FILE)) fs.writeFileSync(DB_FILE, '[]');
if (!fs.existsSync(TOKENS_FILE)) fs.writeFileSync(TOKENS_FILE, '[]');

export const localDb = {
  getResults: () => {
    try {
      const data = fs.readFileSync(DB_FILE, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      console.error("Error reading local DB:", error);
      return [];
    }
  },

  saveResult: (result: any) => {
    try {
      const results = localDb.getResults();
      results.push(result);
      fs.writeFileSync(DB_FILE, JSON.stringify(results, null, 2));
      return true;
    } catch (error) {
      console.error("Error saving to local DB:", error);
      return false;
    }
  },

  getResultById: (id: string) => {
    const results = localDb.getResults();
    return results.find((r: any) => r.id === id);
  },

  getTokens: () => {
    try {
      const data = fs.readFileSync(TOKENS_FILE, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      console.error("Error reading tokens file:", error);
      return [];
    }
  },

  saveToken: (tokenData: any) => {
    try {
      const tokens = localDb.getTokens();
      tokens.push(tokenData);
      fs.writeFileSync(TOKENS_FILE, JSON.stringify(tokens, null, 2));
      return true;
    } catch (error) {
      console.error("Error saving token:", error);
      return false;
    }
  },

  validateToken: (token: string) => {
    const tokens = localDb.getTokens();
    const found = tokens.find((t: any) => t.token === token);
    return found && !found.used;
  },

  useToken: (token: string) => {
    try {
      const tokens = localDb.getTokens();
      const index = tokens.findIndex((t: any) => t.token === token);
      if (index !== -1) {
        tokens[index].used = true;
        fs.writeFileSync(TOKENS_FILE, JSON.stringify(tokens, null, 2));
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error using token:", error);
      return false;
    }
  }
};
