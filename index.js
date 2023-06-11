import cron from 'node-cron';
import fetchData from './fetchData.js';
import processData from './processData.js';
import fs from 'fs';

const saveData = (data, month) => {
  fs.writeFileSync(`./calendar.ics`, data);
};

cron.schedule('0 */8 * * *', async () => {
  //main();
});

async function main() {
  const currentDate = new Date();
  const prevMonth = currentDate.getMonth();
  const currentMonth = currentDate.getMonth() + 1;
  const nextMonth = currentDate.getMonth() + 2;

  const prevMonthData = await fetchData(prevMonth);
  const currentMonthData = await fetchData(currentMonth);
  const nextMonthData = await fetchData(nextMonth);

  const prevMonthIcs = processData(prevMonthData);
  const currentMonthIcs = processData(currentMonthData);
  const nextMonthIcs = processData(nextMonthData);

  let icsData = 'BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//hacksw/handcal//NONSGML v1.0//EN\n';
  icsData += prevMonthIcs.join('');
  icsData += currentMonthIcs.join('');
  icsData += nextMonthIcs.join('');
  icsData += 'END:VCALENDAR';

  saveData(icsData, 'calendar');
}
main();