import dayjs from "dayjs";

const DAYJS_FORMAT = 'YYYY-MM-DD HH:mm:ss';

function isSet(v) {
    return v !== undefined && v !== null && v !== "";
}
function isEmpty(variable) {
    return !isSet(variable) || variable === '' || (Array.isArray(variable) && variable.length === 0);
}
function nowString() {
    return dayjs().format(DAYJS_FORMAT);
}

export {isSet, isEmpty, nowString};