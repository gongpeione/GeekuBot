import axios from 'axios';

export const http = axios.create({
    timeout: 10000,
    validateStatus: function (status) {
        return status >= 200 && status < 300; // default
    },
});

export let uuid = (() => {
    let id = 0;
    return () => {
        return id++;
    }
})();

export function isGroupMsg (msg) {
    return msg.chat.type === 'group';
}

export default {
    http, uuid, isGroupMsg
}