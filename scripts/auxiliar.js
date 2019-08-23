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

