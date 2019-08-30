const setCalendar = () => {
    var year = getSelectedYear();
    var month = getSelectedMonth();
    setCalendarTitle(year, month);
    setCalendarTable(year, month);
    disableButtons(year, month)
}

const disableButtons = (year, month) => {
    const d = new Date();
    const currentMonth = d.getMonth();
    const currentYear = d.getFullYear();
    document.getElementById("next").disabled = year == currentYear && month == currentMonth;

    const monthList = document.getElementById('month-list')
    if (monthList.hasChildNodes()) {
        const id = monthList.childNodes[0].id.split('-');
        const firstMonth = parseInt(id[0])
        const firstYear = parseInt(id[1])
        document.getElementById("back").disabled = year == firstYear && month == firstMonth;
    }
}

const setCalendarTitle = (year, month) => {
    const month_names = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]
    const cal = document.getElementById("calendar-month-year");
    cal.innerHTML = month_names[month] + " " + year;
    cal.setAttribute('data-month', month);
    cal.setAttribute('data-year', year);
}

const setCalendarTable = async (year, month) => {
    const table = document.createElement('table');
    table.appendChild(getRowDayNames())
    const data = await getMonthData(year, month, "day")

    var count = 1;
    var j = 0;
    const days = new Date(year, month + 1, 0).getDate();
    const first_day = new Date(year, month, 1).getDay();
    var firstDaysCounter = 0;
    while (count <= days) {
        tr = document.createElement('tr');
        for (var i = 0; i < 7; i++) {
            if (firstDaysCounter < first_day) {
                td = createEmptyDatetd()
                firstDaysCounter++;
            } else if (count > days) {
                td = createEmptyDatetd()
            } else {
                if (data && j < data.length) {
                    if (data[j].interval.split(' ').length <= 1) {
                        data[j].interval = `${data[j].interval} 00:00:00`;
                    }
                    const day = new Date(data[j].interval).getDate();
                    if (day == count) {
                        td = createDatetd(data[j])
                        j++;
                    } else {
                        td = createEmptyDatetd(count)
                    }
                } else {
                    td = createEmptyDatetd(count)
                }
                count++;
            }
            tr.appendChild(td);
        }
        table.appendChild(tr)
    }
    calendarDates = document.getElementById("calendar-dates");
    if (calendarDates.hasChildNodes()) {
        calendarDates.removeChild(calendarDates.childNodes[0])
    }
    calendarDates.appendChild(table);
}

const getRowDayNames = () => {
    var tr = document.createElement('tr');
    const day_names = ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa"]
    for (var i = 0; i < 7; i++) {
        var td = document.createElement('td');
        td.innerHTML = day_names[i]
        tr.appendChild(td)
    }
    return tr
}

const createEmptyDatetd = (day = "") => {
    var td = document.createElement('td');
    td.style.backgroundColor = "white";
    if (day != "") {
        td.innerHTML = "ND"
    }
    const dayDiv = document.createElement('div')
    dayDiv.innerHTML = day;
    dayDiv.classList.add("calendar-day-number")
    td.appendChild(dayDiv)
    return td;
}

const createDatetd = (data) => {
    var td = document.createElement('td');
    td.classList.add("colored");
    const date = new Date(data.interval)
    td = colorElement(td, data.val_aqi)
    td.addEventListener("click", () => showDayModal(date));
    td.innerHTML = Math.round(data.val_aqi)

    const dayDiv = document.createElement('div')
    dayDiv.innerHTML = date.getDate();
    dayDiv.classList.add("calendar-day-number")
    td.appendChild(dayDiv)

    return td;
}