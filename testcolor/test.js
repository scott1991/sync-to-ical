import tinycolor from "tinycolor2";

const colors = ['#EEB1B1', '#F4BDA6', '#AFB4EB'];
const transformedColors = [];

for (const color of colors) {
  const transformedColor = tinycolor(color).darken(20).saturate(60).brighten(10).toHexString();
  transformedColors.push(transformedColor);
}

const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <title>顏色比較</title>
  <style>
    .color-box {
      width: 100px;
      height: 100px;
      display: inline-block;
      margin: 5px;
    }
  </style>
</head>
<body>
  <div class="color-box" style="background-color: ${colors[0]};">${colors[0]}</div>
  <div class="color-box" style="background-color: ${colors[1]};">${colors[1]}</div>
  <div class="color-box" style="background-color: ${colors[2]};">${colors[2]}</div>
  <br />
  <div class="color-box" style="background-color: ${transformedColors[0]};">${transformedColors[0]}</div>
  <div class="color-box" style="background-color: ${transformedColors[1]};">${transformedColors[1]}</div>
  <div class="color-box" style="background-color: ${transformedColors[2]};">${transformedColors[2]}</div>
  
</body>
</html>
`;

console.log(htmlContent);
