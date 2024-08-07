// Librerias
import axios from 'axios';

// URL base
const baseURL = 'http://localhost:3000/api';

/****************************************************
 *                  Miembros
 ***************************************************/

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

// Eliminar Miembro
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

/****************************************************
 *                  Miembros
 ***************************************************/

// Consultar Ministerios
export const consultarMinisteriosAPI = async (
   successCallback,
   errorCallback
) => {
   const config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `${baseURL}/ministerios`,
      headers: {},
   };

   await axios.request(config).then(successCallback).catch(errorCallback);
};

// Insertar Miembro
export const insertarMinisterioAPI = async (
   data,
   successCallback,
   errorCallback
) => {
   const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${baseURL}/ministerios`,
      headers: {
         'Content-Type': 'application/json',
      },
      data: data,
   };

   await axios.request(config).then(successCallback).catch(errorCallback);
};

// Editar Ministerio
export const editarMinisterioAPI = async (
   id,
   data,
   successCallback,
   errorCallback
) => {
   const config = {
      method: 'put',
      maxBodyLength: Infinity,
      url: `${baseURL}/ministerios/${id}`,
      headers: {
         'Content-Type': 'application/json',
      },
      data: data,
   };

   await axios.request(config).then(successCallback).catch(errorCallback);
};

// Eliminar Ministerio
export const eliminarMinisterioAPI = async (
   id,
   successCallback,
   errorCallback
) => {
   const config = {
      method: 'delete',
      maxBodyLength: Infinity,
      url: `${baseURL}/ministerios/${id}`,
      headers: {},
   };

   await axios.request(config).then(successCallback).catch(errorCallback);
};

/****************************************************
 *              Miembros - Ministerios
 ***************************************************/

// Consultar Miembros Ministerios
export const consultarMiembrosMinisteriosAPI = async (
   successCallback,
   errorCallback
) => {
   const config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `${baseURL}/miem-mini`,
      headers: {},
   };

   await axios.request(config).then(successCallback).catch(errorCallback);
};

// Insertar Miembro - Ministerio
export const insertarMiembroMinisterioAPI = async (
   data,
   successCallback,
   errorCallback
) => {
   const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${baseURL}/miem-mini`,
      headers: {
         'Content-Type': 'application/json',
      },
      data: data,
   };

   await axios.request(config).then(successCallback).catch(errorCallback);
};

// Editar Ministerio
export const editarMiembroMinisterioAPI = async (
   ids,
   data,
   successCallback,
   errorCallback
) => {
   const config = {
      method: 'put',
      maxBodyLength: Infinity,
      url: `${baseURL}/miem-mini/${ids.id_miembro}/${ids.id_ministerio}`,
      headers: {
         'Content-Type': 'application/json',
      },
      data: data,
   };

   await axios.request(config).then(successCallback).catch(errorCallback);
};

// Retirar Ministerio
export const retirarMiembroMinisterioAPI = async (
   ids,
   successCallback,
   errorCallback
) => {
   const config = {
      method: 'put',
      maxBodyLength: Infinity,
      url: `${baseURL}/miem-mini/retirar/${ids.id_miembro}/${ids.id_ministerio}`,
      headers: {
         'Content-Type': 'application/json',
      },
   };

   await axios.request(config).then(successCallback).catch(errorCallback);
};

// Eliminar Miembro - Ministerio
export const eliminarMiembroMinisterioAPI = async (
   ids,
   successCallback,
   errorCallback
) => {
   const config = {
      method: 'put',
      maxBodyLength: Infinity,
      url: `${baseURL}/miem-mini/eliminar/${ids.id_miembro}/${ids.id_ministerio}`,
      headers: {
         'Content-Type': 'application/json',
      },
   };

   await axios.request(config).then(successCallback).catch(errorCallback);
};
