const hideFilters = () => {
    const filters = document.getElementById('filters');
    filters.style.display = "none";
}

const setFilters = () => {
    setCitySelect();
    $('#area-list').select2();
    $('#param-list').select2();
}

const setCitySelect = async () => {
    var areas = await getAreaList();
    var cities = areas.filter(city => city.parent == null || city.parent == 0)

    const cityList = document.getElementById('city-list');
    cities.forEach(city => {
        const option = document.createElement('option');
        option.innerHTML = city.descarea;
        option.value = city.idarea;
        cityList.appendChild(option)
    });
    setAreaSelect(cities[0].idarea)
    $('#city-list').select2();
}

const setAreaSelect = async (idarea) => {
    //delete areaSelect if available
    const areaList = document.getElementById('area-list');
    while (areaList.hasChildNodes()) {
        areaList.removeChild(areaList.childNodes[0]);
    }

    //populate new select
    var tree = await getAreaTree(idarea);
    if (tree.childs.length > 0) {
        $('#area-list').prop('disabled', false);
        const selOption = document.createElement('option');
        selOption.innerHTML = tree.area.descarea;
        selOption.value = tree.area.idarea;
        areaList.appendChild(selOption);

        tree.childs.forEach(area => {
            const option = document.createElement('option');
            option.innerHTML = area.descarea;
            option.value = area.idarea;
            areaList.appendChild(option)
        });
    } else {
        //selected area
        $('#area-list').prop('disabled', true);
    }
}

$('#city-list').on('change', async function () {
    sessionStorage.setItem("idarea", this.value);
    setAreaSelect(this.value)
    refreshCalendars();
});

$('#area-list').on('change', function () {
    sessionStorage.setItem("idarea", this.value);
    refreshCalendars();
});

const getUserLocation = () => {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
            function success(position) {
                setSelectByCoords(position.coords.latitude, position.coords.longitude)
            },
            function error(_) {
                ipLookUp();
            });
    } else {
        ipLookUp();
    }
}

const ipLookUp = () => {
    $.ajax('http://ip-api.com/json')
        .then(
            function success(response) {
                setSelectByCoords(response.lat, response.lon)
            },
            function fail(_) {
                selectCity(2002)
            }
        );
}

const setSelectByCoords = async (lat, long) => {
    const areas = await getAreaByCoord(lat, long);
    if (areas.length > 0) {
        if (areas.length == 1) {
            selectCity(areas[0].idarea)
        } else if (areas.length == 2) {
            //change only selects
            const idcity = areas[0].idarea;
            const idarea = areas[1].idarea;
            selectAreaNoCityTrigger(idcity, idarea);
        }
    }
}

const selectCity = (idarea) => {
    $('#city-list').val(idarea);
    $('#city-list').select2().trigger('change');
}

const selectArea = (idarea) => {
    $('#area-list').val(idarea);
    $('#area-list').select2().trigger('change');
}

const selectAreaNoCityTrigger = async (idcity, idarea) => {
    $('#city-list').val(idcity);
    $('#city-list').select2().trigger('change.select2');
    await setAreaSelect(idcity)
    selectArea(idarea)
}

const selectIdArea = async (idarea) => {
    const areas = await getAreaList();
    const area = areas.find(area => area.idarea == idarea);
    if (area != null) {
        if (area.parent == null || area.parent == 0) {
            selectCity(idarea);
        } else {
            selectAreaNoCityTrigger(area.parent, area.idarea);
        }
    } else {
        getUserLocation();
    }
}

$('#param-list').on('change', async function () {
    sessionStorage.setItem("idparam", this.value);
    refreshCalendars();
});

const selectIdParam = async (idparam) => {
    $('#param-list').val(idparam);
    $('#param-list').select2().trigger('change');
} 

const selectIdParamNoRefresh = (idparam) => {
    sessionStorage.setItem("idparam", idparam);
    $('#param-list').val(idparam);
    $('#param-list').select2().trigger('change.select2');
}
