import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'x-api-key': process.env.NEXT_PUBLIC_API_KEY,
    'accept': 'application/json'
  },
})

export default instance;