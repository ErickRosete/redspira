const changeMonth = (value) => {
    var settedMonth = getSelectedMonth();
    var settedYear = getSelectedYear();
    settedMonth += value;
    if (settedMonth < 0) {
        settedYear -= 1;
        settedMonth += 12;
    } else if (settedMonth > 11) {
        settedYear += 1;
        settedMonth -= 12
    }
    localStorage.setItem('month', settedMonth)
    localStorage.setItem('year', settedYear)
    setCalendar();
    setHourCalendar();
    setActiveMonth();
}

window.onload = () => {
    setSelectedDate(new Date())
    setFilters();
    refreshCalendars();
    getUserLocation();
}

const setSelectedDate = (date) => {
    const current_month = date.getMonth();
    const current_year = date.getFullYear();
    localStorage.setItem('month', current_month)
    localStorage.setItem('year', current_year)
}

const getIdArea = () => {
    var idarea = parseInt(localStorage.getItem('idarea'));
    idarea = idarea != null && !isNaN(idarea) ? idarea : 2002
    return idarea;
};

const getIdParam = () => {
    var idparam = localStorage.getItem('idparam');
    idparam = idparam != null ? idparam : 'PM25'
    return idparam;
}

const getSelectedMonth = () => {
    var month = parseInt(localStorage.getItem('month'));
    month = month != null && !isNaN(month) ? month : new Date().getMonth();
    return month;
}

const getSelectedYear = () => {
    var year = parseInt(localStorage.getItem('year'));
    year = year != null && !isNaN(year) ? year : new Date().getFullYear();
    return year;
}

const refreshCalendars = () => {
    setMonthCalendar();
    setCalendar();
    setHourCalendar()
}