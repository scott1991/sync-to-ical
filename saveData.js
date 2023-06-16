import fs from 'fs';
import path from 'path';
import { format, parse } from 'date-fns';

const saveData = (data, date) => {
  const latestFilePath = getLatestFilePath();

  if (latestFilePath) {
    const existingData = fs.readFileSync(latestFilePath, 'utf8');
    if (existingData === data) {
      console.log('ICS already exists and is identical');
      return; // Do nothing if the data is identical
    }
  }

  const fileName = generateFileName(date);
  const newFilePath = path.join('./historydata', fileName);

  fs.writeFile(newFilePath, data, (err) => {
    if (err) throw err;
    console.log('ICS saved');
  });
};

const getLatestFilePath = () => {
  const directory = './historydata';
  const files = fs.readdirSync(directory);
  if (files.length === 0) {
    return null; // No files in the directory
  }

  let latestFile = files[0];
  let latestDate = parseDateFromFileName(latestFile);

  for (let i = 1; i < files.length; i++) {
    const currentFile = files[i];
    const currentDate = parseDateFromFileName(currentFile);

    if (currentDate > latestDate) {
      latestFile = currentFile;
      latestDate = currentDate;
    }
  }

  return path.join(directory, latestFile);
};

const parseDateFromFileName = (fileName) => {
  const timestamp = fileName.replace('.ics', '');
  const datetimeStr = `${timestamp.substring(0, 8)}_${timestamp.substring(9, 15)}`;

  return parse(datetimeStr, 'yyyyMMdd_HHmmss', new Date());
};

const generateFileName = (date) => {
  return `${format(date, 'yyyyMMdd_HHmmss')}.ics`;
};

export default saveData;
