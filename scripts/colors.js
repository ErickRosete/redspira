const green = ['#00e400', '#2ce900', '#58ed00', '#84f200', '#b0f700',]; // 00 - 50
const yellow = ['#dcfb00', '#fffb00', '#ffe400', '#ffce00', '#ffb800']; // 51 - 100
const orange = ['#ffa200', '#ff8b00', '#ff7500', '#ff6000', '#ff4a00']; // 101 - 150
const red = ['#ff3400', '#ff1e00', '#ff0900', '#f40008', '#e30015']; // 151 - 200
const purple = ['#d10022', '#c0002f', '#ae003c', '#9d0049', '#950046']; // 201 - 300
const brown = ['#91003f', '#8c0038', '#870031', '#83002a', '#7e0023']; // 301 - 500

const colorElement = (el, AQI = 0) => {
    if (AQI <= 50) {
        const colInd = Math.round(mapValue(AQI, 0, 50, 0, 4));
        el.style.backgroundColor = green[colInd];
    } else if (AQI <= 100) {
        const colInd = Math.round(mapValue(AQI, 51, 100, 0, 4));
        el.style.backgroundColor = yellow[colInd];
    } else if (AQI <= 150) {
        const colInd = Math.round(mapValue(AQI, 101, 150, 0, 4));
        el.style.backgroundColor = orange[colInd];
    } else if (AQI <= 200) {
        const colInd = Math.round(mapValue(AQI, 151, 200, 0, 4));
        el.style.backgroundColor = red[colInd];
    } else if (AQI <= 300) {
        const colInd = Math.round(mapValue(AQI, 201, 300, 0, 4));
        el.style.backgroundColor = purple[colInd];
    } else {
        const colInd = Math.round(mapValue(AQI, 301, 500, 0, 4));
        el.style.backgroundColor = brown[colInd];
    }
    return el;
}