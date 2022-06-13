import { getAPIClient } from "../data/service/axios";

export const getUsers = async () => {
  const api = getAPIClient();

  try {
    const data = await api.get();
    return data;
  } catch (error) {
    return error;
  }
};

export const getStudentById = async (id) => {
  const api = getAPIClient();

  try {
    const data = await api.get(`/${id}`);
    return data;
  } catch (error) {
    return error;
  }
};

export const getStudentByName = async (id) => {
  const api = getAPIClient();

  try {
    const data = await api.get(`/search/${id}`);
    return data;
  } catch (error) {
    return error;
  }
};

export const updatedStudentById = async (id, body) => { 
  const api = getAPIClient();

  try {
    const data = await api.patch(`/${id}`, body);
    return data;
  } catch (error) {
    return error;
  }
};

export const deleteStudentById = async (id) => {
  const api = getAPIClient();

  try {
    const data = await api.delete(`/${id}`);
    return data;
  } catch (error) {
    return error;
  }
};

export const registerStudent = async (body) => {
  const api = getAPIClient();

  try {
    const data = await api.post("/", body);    
    return data;
  } catch (error) {
    throw error;
  }
};

