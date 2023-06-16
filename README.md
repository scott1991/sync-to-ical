# Sync to iCal

[中文說明](README.zh-tw.md)

The main function of `Sync to iCal` is to convert Events provided by an API into a format that can be used by calendar applications (iCalendar, .ical). It updates regularly and retains historical data. If the data is the same, it will not be duplicated.

Example data:
```json
{"exposed":true,"firstEventStartAt":"2023-03-07T10:00:00Z","lastEventEndAt":"2023-07-31T10:00:00Z","events":[
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
},...]}

```

## Features

- Regularly fetch event data from a specific API
- Convert the data to iCalendar (.ics) format
- Provide an HTTP server for iCalendar to be read
- Save the most recent data and compare it with the previous data. Only when the data changes, it will be updated.

## How to Use

1. Rename `config.js.example` to `config.js`, and replace the `apiUrl` with the API url you want to get
2. Set `cronSchedule` to schedule regular updates. Use crontab format, such as: `'0 */8 * * *'`
3. Start the program with `node index.js`
4. The program will save the `.ics` format data in the `/historydata` folder
5. The latest data can be accessed via `http://localhost:[port]/calendar.ics`

## Requirements

- Node.js (recommended version 12.20.0+)

## Installation

1. Download this project
2. Install dependencies `npm install`

## Startup

Use the `node index.js` command to start the application.

## License

MIT