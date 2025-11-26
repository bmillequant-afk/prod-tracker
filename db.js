import { kv } from '@vercel/kv';

export default async function handler(request, response) {
  // Lecture des données (GET)
  if (request.method === 'GET') {
    try {
      // On lit la clé "prodtracker_data" dans la base Redis de Vercel
      const data = await kv.get('prodtracker_data');
      return response.status(200).json(data || []);
    } catch (error) {
      return response.status(500).json({ error: 'Erreur lecture DB' });
    }
  }

  // Écriture des données (POST)
  if (request.method === 'POST') {
    try {
      const newData = request.body;
      // On écrase les données avec la nouvelle version (simple pour ce projet)
      await kv.set('prodtracker_data', newData);
      return response.status(200).json({ success: true });
    } catch (error) {
      return response.status(500).json({ error: 'Erreur écriture DB' });
    }
  }
  
  return response.status(405).json({ error: 'Method not allowed' });
}
