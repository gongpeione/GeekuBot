import axios from 'axios';

export const http = axios.create({
    timeout: 10000,
    validateStatus: function (status) {
        return status >= 200 && status < 300; // default
    },
});

export default {
    http
}