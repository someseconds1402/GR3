const PATH = {}

PATH.API = {
    LOGIN: '/api/login',
    GET_PROVINCE_DATA: '/api/get-province',
    GET_PANDEMIC_DATA: '/api/get-pandemic',
    GET_SUPPLY_TYPE_DATA: '/api/get-supply-type',
    GET_MEDICAL_SUPPLY_DATA: '/api/get-medical-supply',
    GET_EPIDEMIC_DATA: '/api/get-epidemic',
    GET_SUPPLY_QUANTITY: '/api/get-supply-quantity',
    GET_ALL_EMAIL: '/api/get-all-eamil',
    ADD_USER: '/api/add-user',
    DELETE_USER: '/api/delete-user',
    GET_EPIDEMIC_DATA_OF_ALL_PROVINCES: '/api/get-epidemic-data-of-all-provinces',
    GET_SUPPLY_QUANTITY_OF_ALL_PROVINCES: '/api/get-supply-quantity-of-all-provinces',
    CLUSTER: '/api/cluster',
    INSERT_SUPPLY_ABILITY: '/api/insert-supply-ability',
    GET_DISTRIBUTION_DATA: '/api/get-distribution-data',
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