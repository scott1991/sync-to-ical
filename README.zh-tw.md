# Sync to iCal

`Sync to iCal` 主要功能是將提供 API 的Event轉換成日曆程式可以使用的格式(iCalendar, .ical)，定期更新並且保留歷史數據，若資料相同則不會重複留存。

範例資料:
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

## 功能

- 定期從特定API取得事件資料
- 將數據轉換成 iCalendar (.ics) 格式
- 提供 HTTP server讓 iCalendar 可以被讀取
- 保存最新一次的資料並與前一次資料進行比對，只有當資料有變動時才會更新

## 使用方式

1. 將 `config.js.example`重新命名為`config.js`，並將其中的 `apiUrl` 替換成要獲取的 API url
2. 設定 `cronSchedule`，以設定定期更新的間隔，使用crontab的格式，如:`'0 */8 * * *'`
3. `node index.js` 啟動程式
4. 程式會將 `.ics` 格式的數據保存在 `/historydata` 資料夾
5. 可以透過 `http://localhost:[port]/calendar.ics` 存取最新的資料

## 需求

- Node.js (建議版本 12.20.0+)

## 安裝

1. 下載此專案
2. 安裝依賴 `npm install`

## 啟動

使用 `node index.js` 命令來啟動應用。

## 授權

MIT
