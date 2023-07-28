# Sync to iCal

[中文說明](README.zh-tw.md)

The main function of `Sync to iCal` is to convert Events provided by an API into a format that can be used by calendar applications (iCalendar, .ical). It updates regularly and retains historical data. If the data is the same, it will not be duplicated.

Example data:
```json
{"exposed":true,"firstEventStartAt":"2023-03-07T10:00:00Z","lastEventEndAt":"2023-07-31T10:00:00Z","events":
[
  {
    "id": "64bfae823878450b44c32370",
    "title": "T-hind S4 EP.8",
    "label": {
      "id": "640ff2df6018a516af970588",
      "name": "Thind",
      "color": "#F4BDA6"
    },
    "starAttendees": [],
    "linked": false,
    "createdAt": "2023-07-25T11:14:10.532Z",
    "startAt": "2023-08-29T10:00:00Z",
    "allDay": false
  },...]
}
```
Output ics:
```
BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//hacksw/handcal//NONSGML v1.0//EN
BEGIN:VEVENT
UID:64bfae823878450b44c32370
DTSTAMP:20230829T100000Z
DTSTART:20230829T100000Z
SUMMARY:T-hind S4 EP.8
DESCRIPTION:🟠 Thind
END:VEVENT
...
END:VCALENDAR
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
