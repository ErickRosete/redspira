const setMonthCalendar = async () => {
    const month_list = document.getElementById('month-list')
    while (month_list.hasChildNodes()) {
        month_list.removeChild(month_list.childNodes[0]);
    }

    const month_names = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"]
    const data = await getEveryMonthData();
    data.forEach(monthData => {
        const date = new Date(`${monthData.interval}-01 12:00:00`);
        const month_tile = document.createElement('div')
        month_tile.innerHTML = month_names[date.getMonth()]
        colorElement(month_tile, monthData.val_aqi)
        month_tile.id = `${date.getMonth()}-${date.getFullYear()}`
        month_tile.addEventListener('click',
            () => {
                localStorage.setItem('month', date.getMonth())
                localStorage.setItem('year', date.getFullYear())
                setCalendar();
                setHourCalendar();
                setActiveMonth();
            }
        )
        month_list.appendChild(month_tile)
    });
    setActiveMonth();
}

const getEveryMonthData = () => {
    const first_date = new Date(2000, 0, 1);
    first_date.setHours(0, 0, 0, 0)
    const last_date = new Date(5000, 0, 1)
    last_date.setHours(23, 0, 0, 0)
    return getAreaData(first_date, last_date, "month")
}

const setActiveMonth = () => {
    var year = getSelectedYear();
    var month = getSelectedMonth();
    $(".active-month").removeClass("active-month")
    $(`#${month}-${year}`).addClass("active-month")
}