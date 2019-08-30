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
    sessionStorage.setItem('month', settedMonth)
    sessionStorage.setItem('year', settedYear)
    setCalendar();
    setHourCalendar();
    setActiveMonth();
}

window.onload = () => {
    sessionStorage.clear();
    setSelectedDate(new Date())
    const params = getUrlValues();

    if (params.idparam) {
        selectIdParamNoRefresh(params.idparam)
    }

    if (params.idmonitor) {
        sessionStorage.setItem('idmonitor', params.idmonitor)
        hideFilters();
        refreshCalendars();
    } else {
        setFilters();
        if (params.idarea) {
            selectIdArea(params.idarea);
            //includes refresh
        } else {
            //comment to wait for input
            refreshCalendars();
            getUserLocation();
        }
    }
}

const getUrlValues = () => {
    const url = window.location.href;
    var aux = url.split('?');
    const params = { idparam: "", idmonitor: "", idarea: "" };

    if (aux.length > 1) {
        const paramStrings = aux[1].split('&');
        paramStrings.forEach((param) => {
            const paramAux = param.split('=');
            if (paramAux.length == 2) {
                if (paramAux[0] == "idarea") {
                    //ints
                    params[paramAux[0]] = parseInt(paramAux[1])
                } else {
                    //strings
                    params[paramAux[0]] = paramAux[1]
                }
            }
        })
    }
    return params;
}


const setSelectedDate = (date) => {
    const current_month = date.getMonth();
    const current_year = date.getFullYear();
    sessionStorage.setItem('month', current_month)
    sessionStorage.setItem('year', current_year)
}

const getIdArea = () => {
    var idarea = parseInt(sessionStorage.getItem('idarea'));
    idarea = idarea != null && !isNaN(idarea) ? idarea : 2002
    return idarea;
};

const getIdParam = () => {
    var idparam = sessionStorage.getItem('idparam');
    idparam = idparam != null ? idparam : 'PM25'
    return idparam;
}

const getSelectedMonth = () => {
    var month = parseInt(sessionStorage.getItem('month'));
    month = month != null && !isNaN(month) ? month : new Date().getMonth();
    return month;
}

const getSelectedYear = () => {
    var year = parseInt(sessionStorage.getItem('year'));
    year = year != null && !isNaN(year) ? year : new Date().getFullYear();
    return year;
}

const getIdMonitor = () => {
    var idmonitor = sessionStorage.getItem('idmonitor');
    idmonitor = idmonitor != null ? idmonitor : 'A0004'
    return idmonitor;
}

const refreshCalendars = () => {
    setMonthCalendar();
    setCalendar();
    setHourCalendar()
}