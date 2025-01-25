import axios from 'axios';
// import jwt_decode from 'jwt-decode';

const API = axios.create({ baseURL: `https://podvibe-backend-server.onrender.com/` }); 

//auth
export const signIn = async ({ email, password }) => await API.post('/auth/login', { email, password });
export const signUp = async ({
    name,
    email,
    password,
}) => await API.post('/auth/signup', {
    name,
    email,
    password,
});
export const googleSignIn = async ({
    name,
    email,
    img,
}) => await API.post('/auth/google', {
    name,
    email,
    img,
});