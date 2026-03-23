const API_KEY = import.meta.env.VITE_RAPIDAPI_KEY;
const API_HOST = import.meta.env.VITE_RAPIDAPI_HOST;

const options = {
  method: 'GET',
  headers: {
    'x-rapidapi-key': API_KEY || '',
    'x-rapidapi-host': API_HOST || '',
    'Content-Type': 'application/json'
  }
};

export const fetchApi = async <T>(endpoint: string): Promise<T> => {
  if (!API_KEY) throw new Error("API Key is missing in .env file.");

  const response = await fetch(`https://${API_HOST}${endpoint}`, options);
  if (!response.ok) {
    throw new Error(`API Request Failed: ${response.status} ${response.statusText}`);
  }
  return response.json();
};