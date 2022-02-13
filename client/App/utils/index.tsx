/**
 * Index file for utils
 * 
 * API calls to the server
 */
import axios from 'axios';

// API
import { API_URL } from '@env';

/**
 * Get matches
 * 
 * @param userId 
 * @param token
 * 
 * When calling this function, use a then() and a 
 * catch() to get the response.
 */
const getMatches = async (userId: string, token: string) => {
  return axios.get(`${API_URL}/discover/`, {
    headers: {
      Authorization: `Bearer ${token}`
    },
    userId,
  });
}
//36bc02de-6183-44d8-9166-9a5002418ac2

/**
 * Get user profile
 * 
 * @param userId 
 * @param token Needed to access routes
 * 
 * When calling this function, use a then() and a 
 * catch() to get the response.
 */
const getProfile = async (userId: string, token: string) => {
  return axios.get(`${API_URL}/profile/`, {
    headers: {
      Authorization: `Bearer ${token}`
    },
    userId,
  });
}

/**
 * Creates user profile
 * 
 * @param userId 
 * @param token
 * @param name 
 * @param gender 
 * @param yearBorn 
 * @param aboutMe
 * @param religion 
 * @param location 
 * @param hobbies 
 * 
 * When calling this function, use a then() and a 
 * catch() to get the response.
 */
const createProfile = async (
  userId: string,
  token: string,
  name: string,
  gender: string,
  yearBorn: number,
  aboutMe: string,
  religion: string,
  location: string,
  hobbies: string[],
) => {
  // call axios to the API
  return axios.post(`${API_URL}/profile/create`, {
    userId,
    token,
    name,
    gender,
    yearBorn,
    aboutMe,
    religion,
    location,
    hobbies
  });
}

/**
 * Updates user profile
 * 
 * @param userId 
 * @param token
 * @param name 
 * @param gender 
 * @param yearBorn 
 * @param aboutMe
 * @param religion 
 * @param location 
 * @param hobbies 
 * 
 * When calling this function, use a then() and a 
 * catch() to get the response.
 */
const updateProfile = async (
  userId: string,
  token: string,
  name: string,
  gender: string,
  yearBorn: number,
  aboutMe: string,
  religion: string,
  location: string,
  hobbies: string[],
) => {
  // call axios to the API
  return axios.post(`${API_URL}/profile/update`, {
    userId,
    token,
    name,
    gender,
    yearBorn,
    aboutMe,
    religion,
    location,
    hobbies
  });
}

export {
  getProfile,
  updateProfile,
  createProfile,
  getMatches
}
