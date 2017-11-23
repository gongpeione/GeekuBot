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

export function checkGroupMsg (msg, match) {
    if (msg.chat.type === 'group' && !match[1]) {
        return true;
    }
}

export default {
    http, uuid
}