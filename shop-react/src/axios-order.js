import axios from 'axios';

const instance= axios.create({
    baseURL:'https://demoonlineshop-f2e98.firebaseio.com/',

});

export default instance;
