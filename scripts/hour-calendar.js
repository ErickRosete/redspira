
const setHourCalendar = async () => {
    var year = getSelectedYear();
    var month = getSelectedMonth();

    const table = document.createElement('table');
    const data = await getMonthData(year, month, "hour")
    const days = new Date(year, month + 1, 0).getDate();
    var d = 0

    //auxMatrix
    var dataMatrix = Array(24).fill().map(() => Array(days).fill())
    for (var i = 1; i <= days; i++) {
        for (var j = 0; j < 24; j++) {
            if (data && d < data.length) {
                const date = new Date(data[d].interval);
                if (date.getDate() == i && date.getHours() == j) {
                    dataMatrix[j][i - 1] = data[d];
                    d++;
                }
            }
        }
    }

    //fill table
    for (var i = 0; i < 25; i++) {
        const tr = document.createElement('tr');
        if (i == 0) {
            const ylabel = createtd()
            ylabel.classList.add("hour-calendar-label")
            ylabel.rowSpan = 25
            const div = creatediv("Horas")
            div.classList.add("rotate")
            ylabel.appendChild(div)
            tr.appendChild(ylabel)
        }
        tr.appendChild(createtd(i < 24 ? i : ""))
        for (var j = 0; j < days; j++) {
            var td;
            if (i == 24) {
                td = createtd(j + 1)
            } else if (dataMatrix[i][j] != undefined) {
                td = createHourCalendartd(dataMatrix[i][j])
            } else {
                td = createtd();
            }
            tr.appendChild(td)
        }
        table.appendChild(tr)
    }
    const xlabel = document.createElement('tr')
    xlabel.classList.add("hour-calendar-label")
    xlabel.appendChild(document.createElement('td'))
    const hourtd = createtd('Días')
    hourtd.colSpan = days + 1
    xlabel.appendChild(hourtd)
    table.appendChild(xlabel)

    const hourCalendar = document.getElementById("hour-calendar");
    if (hourCalendar.hasChildNodes()) {
        hourCalendar.removeChild(hourCalendar.childNodes[0])
    }
    hourCalendar.appendChild(table);
}

const setHourCalendarAlt = async () => {
    var year = getSelectedYear();
    var month = getSelectedMonth();

    const table = document.createElement('table');
    const data = await getMonthData(year, month, "hour")
    var d = 0
    const days = new Date(year, month + 1, 0).getDate();
    for (var i = 1; i <= days; i++) {
        const tr = document.createElement('tr');
        if (i == 1) {
            const ylabel = createtd()
            ylabel.classList.add("hour-calendar-label")
            ylabel.rowSpan = days + 1
            const div = creatediv("Días")
            div.classList.add("rotate")
            ylabel.appendChild(div)
            tr.appendChild(ylabel)
        }
        tr.appendChild(createtd(i))
        for (var j = 0; j < 24; j++) {
            if (data && d < data.length) {
                const date = new Date(data[d].interval);
                var td;
                if (date.getDate() == i && date.getHours() == j) {
                    td = createHourCalendartd(data[d])
                    d++;
                } else {
                    td = createtd();
                }
            } else {
                td = createtd()
            }
            tr.appendChild(td)
        }
        table.appendChild(tr)
    }

    const tr = document.createElement('tr')
    tr.appendChild(document.createElement('td'))
    for (var j = 0; j < 24; j++) {
        tr.appendChild(createtd(j))
    }
    table.appendChild(tr)

    const xlabel = document.createElement('tr')
    xlabel.classList.add("hour-calendar-label")
    xlabel.appendChild(document.createElement('td'))
    const hourtd = createtd('Horas')
    hourtd.colSpan = 25
    xlabel.appendChild(hourtd)
    table.appendChild(xlabel)

    const hourCalendar = document.getElementById("hour-calendar");
    if (hourCalendar.hasChildNodes()) {
        hourCalendar.removeChild(hourCalendar.childNodes[0])
    }
    hourCalendar.appendChild(table);
}

const createHourCalendartd = (data) => {
    var td = document.createElement('td');
    // td.classList.add("colored");
    td = colorElement(td, data.val_aqi)
    return td;
}

const createtd = (value = "") => {
    var td = document.createElement('td');
    td.innerHTML = value;
    td.backgroundColor = "white";
    return td;
}
const creatediv = (value = "") => {
    var div = document.createElement('div');
    div.innerHTML = value;
    div.backgroundColor = "white";
    return div;
}