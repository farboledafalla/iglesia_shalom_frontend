// Librerias
import axios from 'axios';

// URL base
const baseURL = 'http://localhost:3000/api';

// Consultar Miembros
export const consultarMiembrosAPI = async (successCallback, errorCallback) => {
   const config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `${baseURL}/miembros`,
      headers: {},
   };

   await axios.request(config).then(successCallback).catch(errorCallback);
};

// Insertar Miembro
export const insertarMiembroAPI = async (
   data,
   successCallback,
   errorCallback
) => {
   const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${baseURL}/miembros`,
      headers: {
         'Content-Type': 'application/json',
      },
      data: data,
   };

   await axios.request(config).then(successCallback).catch(errorCallback);
};

// Editar Miembro
export const editarMiembroAPI = async (
   id,
   data,
   successCallback,
   errorCallback
) => {
   const config = {
      method: 'put',
      maxBodyLength: Infinity,
      url: `${baseURL}/miembros/${id}`,
      headers: {
         'Content-Type': 'application/json',
      },
      data: data,
   };

   await axios.request(config).then(successCallback).catch(errorCallback);
};

export const eliminarMiembroAPI = async (
   id,
   successCallback,
   errorCallback
) => {
   const config = {
      method: 'delete',
      maxBodyLength: Infinity,
      url: `${baseURL}/miembros/${id}`,
      headers: {},
   };

   await axios.request(config).then(successCallback).catch(errorCallback);
};
