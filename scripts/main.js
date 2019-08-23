const changeMonth = (value) => {
    const cal = document.getElementById("calendar-month-year");
    var settedMonth = parseInt(cal.getAttribute('data-month'));
    var settedYear = parseInt(cal.getAttribute('data-year'));

    settedMonth += value;
    if (settedMonth < 0) {
        settedYear -= 1;
        settedMonth += 12;
    } else if (settedMonth > 11) {
        settedYear += 1;
        settedMonth -= 12
    }
    setCalendar(settedYear, settedMonth);
}

window.onload = () => {
    const d = new Date();
    const current_month = d.getMonth();
    const current_year = d.getFullYear();
    setMonthCalendar().then(() => setActiveMonth(current_year, current_month));
    setCalendar(current_year, current_month);
}