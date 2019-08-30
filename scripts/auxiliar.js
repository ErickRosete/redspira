const getFormattedDate = (date) => {
    const year = padWithZeroes(date.getFullYear(), 4);
    const month = padWithZeroes(date.getMonth() + 1, 2);
    const day = padWithZeroes(date.getDate(), 2);
    const hours = padWithZeroes(date.getHours(), 2);
    const minutes = padWithZeroes(date.getMinutes(), 2);
    const seconds = padWithZeroes(date.getSeconds(), 2);
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
}

const padWithZeroes = (number, length) => {
    var paddedNumber = '' + number;
    while (paddedNumber.length < length) {
        paddedNumber = '0' + paddedNumber;
    }
    return paddedNumber
}

const mapValue = (value, fromLow, fromHigh, toLow, toHigh) => {
    return (value - fromLow) * (toHigh - toLow) / (fromHigh - fromLow) + toLow;
}

const numtohour = (num) => {
    const hour = padWithZeroes(num, 2)
    return `${hour}:00`
}

const getMonthData = (year, month, param = "day") => {
    const first_date = new Date(year, month, 1);
    first_date.setHours(0, 0, 0, 0)
    const last_date = new Date(year, month + 1, 0)
    last_date.setHours(23, 0, 0, 0)
    return getAreaData(first_date, last_date, param)
}
