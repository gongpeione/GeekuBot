const axios = require('axios');
const { JSDOM } = require('jsdom');
const moment = require('moment');
const fs = require('fs');

const dateTemplate = 'http://gb.weather.gov.hk/cgi-bin/hko/special_result_c.pl?yyyy={y}&yyyymm={m}&dd={d}';
const year = fs.readFileSync('year', { encoding: 'utf8' }).trim() || '1934';
const startDate = moment(year + "-1-1");
//console.log(year); process.exit(1);
let currentDate = startDate;
const dateList = {};
const daymm = 24 * 3600 * 1000;
let i = 0;
while(true) {
    const dateArr = currentDate.format('YYYY-M-D').split('-');
    !dateList[dateArr[0]] && (dateList[dateArr[0]] = []);
    dateList[dateArr[0]].push(dateArr);
    if(dateArr[0] === '2017') {
        break;
    }
    currentDate = currentDate.add(1, 'day');
}

(async () => {
    const years = Object.keys(dateList);
    for (let i = 0; i < years.length; i++) {
        const contentList = [];
	console.log(years[i] + '\n');
        for (let j = 0; j < dateList[years[i]].length; j++) {
            const date = dateList[years[i]][j];
            const url = dateTemplate.replace('{y}', date[0]).replace('{m}', date[1]).replace('{d}', date[2]);
            try {
                await axios.get(url).then(data => {
                    data = data.data;
                    const dom = new JSDOM(data);
                    const document = dom.window.document;
                    const temp = document.querySelector('#氣溫 + .stat1').innerHTML.replace(' 摄氏度', '').split(' 至 ').map(num => +num);
                    const rain = +document.querySelector('#雨量 + .stat1').innerHTML.split(' ')[0];
                    const sun = +document.querySelector('#陽光 + .stat1').innerHTML.split(' ')[0];
                    contentList.push({date, temp, rain, sun});
                });
            } catch (e) {
                console.log(e);
            }
            await new Promise((r, j) => setTimeout(() => r()), 50).catch(e=>e);
        }
        fs.writeFileSync(`${years[i]}.json`, JSON.stringify(contentList, null, '    '));
        fs.writeFileSync('year', years[i]);
    }

})().catch(e=>console.log(e))