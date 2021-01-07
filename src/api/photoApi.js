import axios from 'axios';
// import * as Config from '../constants/config'; // URL

export default async function callApi(endpoint, method = 'GET', body) {
    try {
        return axios({
            method: method,
            url: `http://localhost:3000/${endpoint}`,
            data: body
        });
    }
    catch (err) {
        console.log(err);
    }
}