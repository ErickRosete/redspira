const getAreaData = (start, end, interval = "day") => {
    const firstDate = getFormattedDate(start);
    const lastDate = getFormattedDate(end);
    const idarea = getIdArea();
    const idparam = getIdParam();
    const req = { idarea: idarea, idparam: idparam, interval: interval, datetime1: firstDate, datetime2: lastDate, timeoffset: -7 }
    const url = "http://app.respira.org.mx/ws/get-area-data.php"
    return ajaxQuery(url, req);
}

const getAreaList = () => {
    const url = "http://app.respira.org.mx/ws/get-areas.php"
    return ajaxQuery(url, {});
}

const getAreaTree = (idarea) => {
    const url = "http://app.respira.org.mx/ws/get-area-tree.php";
    const req = { idarea: idarea }
    return ajaxQuery(url, req);
}

const getAreaByCoord = (lat, long) => {
    const url = "http://app.respira.org.mx/ws/get-areas.php"
    const req = { y: lat, x: long }
    return ajaxQuery(url, req);
}

const ajaxQuery = (url, req = {}) => {
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