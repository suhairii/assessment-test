import fs from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'src', 'data');
const SETTINGS_FILE = path.join(DATA_DIR, 'settings.json');

// Ensure settings file exists
if (!fs.existsSync(SETTINGS_FILE)) {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  fs.writeFileSync(SETTINGS_FILE, JSON.stringify({ maintenance: false }, null, 2));
}

export const settingsDb = {
  getSettings: () => {
    try {
      const data = fs.readFileSync(SETTINGS_FILE, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      console.error("Error reading settings:", error);
      return { maintenance: false };
    }
  },

  updateSettings: (newSettings: { maintenance: boolean }) => {
    try {
      const current = settingsDb.getSettings();
      const updated = { ...current, ...newSettings };
      fs.writeFileSync(SETTINGS_FILE, JSON.stringify(updated, null, 2));
      return true;
    } catch (error) {
      console.error("Error updating settings:", error);
      return false;
    }
  }
};
