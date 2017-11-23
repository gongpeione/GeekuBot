import config from '../config';

const commands = [
    'start',
    'help',
    'appicon'
];

export const cmdReg = {};

const botName = `@${config.BOT_NAME}`;
commands.forEach(cmd => {
    cmdReg[cmd] = new RegExp(`/${cmd}\\s?(${botName})?(\\s.+)?`, 'i');
});

export default {
    cmdReg
}