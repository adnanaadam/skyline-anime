import axios from 'axios';

const jikanClient = axios.create({
  baseURL: 'https://api.jikan.moe/v4',
  timeout: 10000, // 10 second timeout
});

// Get current seasonal anime
export const getSeasonalAnime = async () => {
  try {
    const response = await jikanClient.get('/seasons/now');
    return response.data;
  } catch (error) {
    console.error('Error fetching seasonal anime:', error);
    throw error;
  }
};

// Get top anime
export const getTopAnime = async () => {
  try {
    const response = await jikanClient.get('/top/anime?filter=bypopularity');
    return response.data;
  } catch (error) {
    console.error('Error fetching top anime:', error);
    throw error;
  }
};

// Get anime by ID
export const getAnimeById = async (id) => {
  try {
    const response = await jikanClient.get(`/anime/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching anime by ID:', error);
    throw error;
  }
};

// Search anime
export const searchAnime = async (query) => {
  try {
    const response = await jikanClient.get(`/anime?q=${query}&order_by=popularity`);
    return response.data;
  } catch (error) {
    console.error('Error searching anime:', error);
    throw error;
  }
};

// Get anime by genre (optional)
export const getAnimeByGenre = async (genreId) => {
  try {
    const response = await jikanClient.get(`/anime?genres=${genreId}&order_by=popularity`);
    return response.data;
  } catch (error) {
    console.error('Error fetching anime by genre:', error);
    throw error;
  }
};


// Get anime videos
export const getAnimeVideos = async (id) => {
  try {
    const response = await jikanClient.get(`/anime/${id}/videos`);
    return response.data;
  } catch (error) {
    console.error('Error fetching anime videos:', error);
    throw error;
  }
};


// Get full anime data
export const getAnimeFull = async (id) => {
  try {
    const response = await jikanClient.get(`/anime/${id}/full`);
    return response.data;
  } catch (error) {
    console.error('Error fetching full anime data:', error);
    throw error;
  }
};