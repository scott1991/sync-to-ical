import fetchData from './fetchData.js';
import processData from './processData.js';


async function getIcs() {
  const currentDate = new Date();
  const prevMonth = currentDate.getMonth(); // 0-11
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
  return {
    content: icsData,
    fetchDate:currentDate
  };
}

export default getIcs;