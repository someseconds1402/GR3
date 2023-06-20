const PATH = {}

PATH.API = {
    LOGIN: '/api/login',
    GET_PANDEMIC_DATA: '/api/get-pandemic',
    GET_EPIDEMIC_DATA: '/api/getepidemic',
}

const role = {
    ADMIN: 0,
    EXPERT: 1,
}

const loginCondition = {
    LOGIN_SUCCESS: 0,
    EMAIL_NOT_EXIST: 1,
    FAILED_PASSWORD: 2,
}

const errorCode = {
    NO_ERROR: 0,
    LOGIN_FAILED: 1,
}

module.exports = {
    PATH,
    role,
    loginCondition,
    errorCode,
};