import axios from 'axios'

const instance = axios.create({
    baseURL:'https://astute-sky-251305.firebaseio.com/'
});

export default instance;