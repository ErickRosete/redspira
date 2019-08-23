const getAreaData = (start, end, interval = "day") => {
    const firstDate = getFormattedDate(start);
    const lastDate = getFormattedDate(end)
    const req = { idarea: 2002, idparam: "PM25", interval: interval, datetime1: firstDate, datetime2: lastDate, timeoffset: -7 }
    const url = "http://app.respira.org.mx/ws/get-area-data.php"
    return $.ajax({
        url: url,
        contentType: "application/x-www-form-urlencoded",
        dataType: 'json',
        data: req,
        crossDomain: true,
        method: 'GET',
        success: function (data) {
            console.log(data)
            return data;
        }
    });
}