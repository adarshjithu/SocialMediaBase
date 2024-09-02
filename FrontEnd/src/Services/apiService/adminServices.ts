import axiosInstance from "../api";

import errorHandler from "../erroHandler";

//Get all users
export const getAllUsers = async (page:number,type:string) => {
    try {
         const response = await axiosInstance.get(`/admin/users?page=${page}&type=${type}`);
         
         return response;
    } catch (error) {
         errorHandler(error)
    }
};
//Block user
export const blockUser = async (obj:Record<string,any>) => {
    try {
         const response = await axiosInstance.get(`/admin/user/block?userId=${obj._id}`);
         
         return response;
    } catch (error) {
         errorHandler(error)
    }}
    
//Block user
export const deleteUser = async (obj:Record<string,any>) => {
     console.log('call')
    try {
         const response = await axiosInstance.delete(`/admin/user/delete?userId=${obj._id}`);
         
         return response;
    } catch (error) {
         errorHandler(error)
    }
};

//LoginAdmin
export const adminLogin = async (arg: Object) => {
     try {
          const response = await axiosInstance.post(`admin/login`, arg);
          console.log(response,'resonse')
          return response.data
         
          // return response.data;
     } catch (error) {
          errorHandler(error)
     }
};
//Logout Admin
export const logoutAdmin = async () => {
     try {
          const response = await axiosInstance.get(`admin/logout`);
          console.log(response,'resonse')
          return response.data
         
          // return response.data;
     } catch (error) {
          errorHandler(error)
     }
};

