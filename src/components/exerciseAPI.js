import axios from 'axios';

const API_BASE_URL = 'https://exercisedb.p.rapidapi.com/exercises';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com',
    'X-RapidAPI-Key': 'YOUR_RAPID_API_KEY',
  },
});

export const getExercisesByEquipment = async (equipment, limit) => {
  try {
    const response = await axiosInstance.get(`/equipment/${encodeURIComponent(equipment)}`);
    return response.data.slice(0, limit);
  } catch (error) {
    console.error('Error fetching exercises by equipment:', error);
    throw error;
  }
};

export const getExercisesByTarget = async (target, limit) => {
  try {
    const response = await axiosInstance.get(`/target/${encodeURIComponent(target)}`);
    return response.data.slice(0, limit);
  } catch (error) {
    console.error('Error fetching exercises by target:', error);
    throw error;
  }
};

export const getExercisesByBodyPart = async (bodyPart, limit) => {
  try {
    const response = await axiosInstance.get(`/bodyPart/${encodeURIComponent(bodyPart)}`);
    return response.data.slice(0, limit);
  } catch (error) {
    console.error('Error fetching exercises by body part:', error);
    throw error;
  }
};
