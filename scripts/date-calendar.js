
const showDayModal = (date) => {
    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    $('#dayModal #title').text(date.toLocaleDateString('es', options))
    setDateCalendar(date)
    $('#dayModal').modal('show');
}

const setDateCalendar = async (date) => {
    const start = new Date(date.getTime())
    start.setHours(0, 0, 0, 0)
    const end = new Date(date.getTime())
    end.setHours(23, 0, 0, 0)
    const data = await getAreaData(start, end, "hour")
    const table = document.createElement('table');
    j = 0;
    for (i = 0; i < 24; i++) {
        if (data && j < data.length) {
            const hour = new Date(data[j].interval).getHours()
            if (hour == i) {
                table.appendChild(createHourtr(data[j]))
                j++;
            } else {
                table.appendChild(createEmptyHourtr(i))
            }
        } else {
            table.appendChild(createEmptyHourtr(i))
        }

    }

    const cal = document.getElementById('calendar-single-date')
    if (cal.hasChildNodes()) {
        cal.removeChild(cal.childNodes[0])
    }
    cal.appendChild(table)
}

const createHourtr = (data) => {
    const tr = document.createElement('tr');
    const hour = padWithZeroes(new Date(data.interval).getHours(), 2);
    const td1 = document.createElement('td');
    td1.innerHTML = hour + ":00";
    td1.classList.add("hour-td")
    colorElement(td1, data.val_aqi);
    tr.appendChild(td1)
    tr.appendChild(createHourInfotd(data))
    return tr
}

const createHourInfotd = (data) => {
    const td = document.createElement('td')
    td.classList.add('hour-info-td')
    const AQI = Math.round(data.val_aqi * 100) / 100
    if (AQI <= 50) {
        td.innerHTML = `AQI: ${AQI} - Bueno`
        td.style.backgroundColor = "#e8f5e9"
    } else if (AQI <= 100) {
        td.innerHTML = `AQI: ${AQI} - Moderado`
        td.style.backgroundColor = "#fffde7"
    } else if (AQI <= 150) {
        td.innerHTML = `AQI: ${AQI} - Insalubre para grupos sensibles`
        td.style.backgroundColor = "#fff3e0"
    } else if (AQI <= 200) {
        td.innerHTML = `AQI: ${AQI} - Insalubre`
        td.style.backgroundColor = "#ffebee"
    } else if (AQI <= 300) {
        td.innerHTML = `AQI: ${AQI} - Muy insalubre`
        td.style.backgroundColor = "#f3e5f5"
    } else {
        td.innerHTML = `AQI: ${AQI} - Peligroso`
        td.style.backgroundColor = "#efebe9"
    }
    return td;
}

const createEmptyHourtr = (hour) => {
    const tr = document.createElement('tr');
    const td1 = document.createElement('td');
    td1.innerHTML = padWithZeroes(hour, 2) + ":00";
    td1.classList.add("hour-td")
    td1.style.backgroundColor = "white"
    tr.appendChild(td1)
    td2 = document.createElement('td')
    td2.innerHTML = "Sin información";
    td2.classList.add('hour-info-td')
    tr.appendChild(td2)
    return tr
}

