import axios from 'axios';

const instance = axios.create({
  baseURL: "https://react-my-burger-46b0f.firebaseio.com/",
});

export default instance;