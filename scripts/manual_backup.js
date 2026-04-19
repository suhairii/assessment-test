const { MongoClient } = require('mongodb');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: '.env.local' });

async function backup() {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
        console.error('MONGODB_URI tidak ditemukan di .env.local');
        process.exit(1);
    }

    const client = new MongoClient(uri);
    const dbName = 'disc_db';
    const collections = ['test_results', 'invitations'];

    try {
        console.log('Menghubungkan ke MongoDB Atlas...');
        await client.connect();
        console.log('Berhasil terhubung!');

        const db = client.db(dbName);
        const backupDir = path.join(__dirname, '..', 'backups', `json_${new Date().toISOString().split('T')[0]}`);
        
        if (!fs.existsSync(backupDir)) {
            fs.mkdirSync(backupDir, { recursive: true });
        }

        for (const colName of collections) {
            console.log(`Mencadangkan koleksi: ${colName}...`);
            const data = await db.collection(colName).find({}).toArray();
            const filePath = path.join(backupDir, `${colName}.json`);
            fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
            console.log(`Berhasil! Tersimpan di: ${filePath} (${data.length} dokumen)`);
        }

    } catch (err) {
        console.error('Terjadi kesalahan saat backup:', err);
    } finally {
        await client.close();
    }
}

backup();
