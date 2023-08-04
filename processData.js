import tinycolor from 'tinycolor2';
// define emoji color so we can compare it with the label color
const emojiColors = [
  { color: '#FF0000', emoji: '🔴' },
  { color: '#FFA500', emoji: '🟠' },
  { color: '#FFFF00', emoji: '🟡' },
  { color: '#008000', emoji: '🟢' },
  { color: '#0000FF', emoji: '🔵' },
  { color: '#8A2BE2', emoji: '🟣' },
  { color: '#FFFFFF', emoji: '⚪️' },
  { color: '#A52A2A', emoji: '🟤' },
  { color: '#000000', emoji: '⚫' }
];

function getHSVDistance(color1, color2) {
  const hsv1 = tinycolor(color1).toHsv();
  const hsv2 = tinycolor(color2).toHsv();
  
  const hDistance = Math.abs(hsv1.h - hsv2.h);
  const sDistance = Math.abs(hsv1.s - hsv2.s);
  const vDistance = Math.abs(hsv1.v - hsv2.v);
  
  return Math.sqrt(Math.pow(hDistance, 2) + Math.pow(sDistance, 2) + Math.pow(vDistance, 2));
}

// 找出與輸入色碼最相似的顏色emoji
function findClosestColorEmoji(inputColor) {
  let closestEmojiColor = null;
  let minDistance = Number.MAX_VALUE;
  
  for (const emojiColor of emojiColors) {
    const distance = getHSVDistance(inputColor, emojiColor.color);
    if (distance < minDistance) {
      minDistance = distance;
      closestEmojiColor = emojiColor;
    }
  }
  
  return closestEmojiColor;
}

/** event:
 {
  "id": "644a42405a5d4e691d6951a8",
  "title": "title",
  "label": {
    "id": "64193963219988402df54980",
    "name": "Lable Name",
    "color": "#AFB4EB"
  },
  "starAttendees": [],
  "linked": false,
  "createdAt": "2023-04-27T09:37:04.878Z",
  "startAt": "2023-06-06T09:00:00Z",
  "allDay": false
}
 */
function convertToIcs(event) {
  let description = "";
  if (event.label) {
    // find the closest emoji color
    const darkerColor = tinycolor(event.label.color).darken(20).saturate(60).brighten(10).toHexString();
    const closestEmojiColor = findClosestColorEmoji(darkerColor) ;
    //console.log("event.label.color:",event.label.color,"closestEmojiColor",closestEmojiColor);
    description = `${closestEmojiColor.emoji} ${event.label.name}`;
  }


  let icsData = 'BEGIN:VEVENT\r\n';
  icsData += `UID:${event.id}\r\n`;
  icsData += `DTSTAMP:${event.startAt.replace(/-|:|\.\d\d\d/g, '')}\r\n`;
  icsData += `DTSTART:${event.startAt.replace(/-|:|\.\d\d\d/g, '')}\r\n`;
  icsData += `SUMMARY:${event.title}\r\n`;
  icsData += `DESCRIPTION:${description}\r\n`;
  icsData += 'END:VEVENT\r\n';

  return icsData;
}

function processData(data) {
  return data.map(event => convertToIcs(event));
}


export default processData;

