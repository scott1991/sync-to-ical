import cron from 'node-cron';
import getIcs from './ics.js';
import http from 'http';
import saveData from './saveData.js'
import config from './config.js';

let icsData = null;
getIcs().then(data => {
  icsData = data;
  console.log('ICS updated', icsData.fetchDate.toISOString());
  saveData(icsData.content, icsData.fetchDate);
});

// serve icsdata as calendar.ics
http.createServer((req, res) => {
  if (req.url === '/calendar.ics') {
    res.writeHead(200, { 'Content-Type': 'text/calendar' });
    res.end(icsData.content);
  } else {
    res.writeHead(404);
    res.end();
  }
}).listen(23457);
console.log('Server running');

// update icsData schedulled by cron
cron.schedule(config.cronSchedule, async () => {
  icsData = await getIcs();
  console.log('ICS updated', icsData.fetchDate.toISOString());
  saveData(icsData.content, icsData.fetchDate);
});
console.log('Cron scheduled');
