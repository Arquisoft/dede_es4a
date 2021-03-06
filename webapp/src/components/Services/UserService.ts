import axios from "axios";
import { toast } from "react-toastify";
import {User} from "../../shared/sharedtypes";

const API = process.env.REACT_APP_API_URI || 'http://localhost:5000/api';

export const createNewUser = async (user: User) => {
    const res = await axios.post(`${API}/signup`, user)
    .then((response) => {return response})
    .catch((error) => {
        toast.error(error.response.data.msg); 
        return error});
    return res;
};

export const login = async (user: User) => {
    const res = await axios.post(`${API}/login`, user)
    .then((response) => {return response})
    .catch((error) => {
        toast.error(error.response.data.msg); 
        return error});
    return res;
};

export const getAddress = async (token:string,pod: string) => {
    const res= await axios.post(`${API}/user/pod`,{pod}, {headers:{'Authorization': token}})
    .then((response) => {return response})
    .catch((error) => {
        toast.error(error.response.data.msg); 
        return error});
    return res;
};