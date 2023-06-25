export const PATH = {
    HOME: '/',
    LOGIN: '/login',
    LOG_OUT: '/logout',
    SYSTEM: '/system',
    NOT_FOUND: '/*',

    ACCOUNT_MANAGE: '/acc-manage',

    EPIDEMIC_ANALYSE: '/epidemic-analyse',
    SUPPLIES_ANALYSE: '/supply-analyse',
    DISTRIBUTION_ANALYSE: '/distribution-analyse',
    DB_MODYFY: '/db-modify',

    EPIDEMIC_DISPLAY: '/epidemic-display',
    SUPPLIES_DISPLAY: '/supplies-display',
    DISTRIBUTION_DISPLAY: '/distribution-display',
};

export const SCREEN_PATH = [
    // ADMIN: 
    [
        '/acc-manage',
    ],
    // EXPERT: 
    [
        '/epidemic-analyse',
        '/supply-analyse',
        '/distribution-analyse',
        '/db-modify',
    ],
    // GUEST: 
    [
        '/epidemic-display',
        '/supplies-display',
        '/distribution-display',
    ],
];

export const PATH_API = {
    BASE_URL: 'http://localhost:8080',
    LOGIN_API: '/api/login',
    GET_PANDEMIC_DATA: '/api/get-pandemic',
    GET_EPIDEMIC_DATA: '/api/get-epidemic',
    GET_SUPPLY_QUANTITY: '/api/get-supply-quantity',
    GET_ALL_EMAIL: '/api/get-all-eamil',
    ADD_USER: '/api/add-user',
    DELETE_USER: '/api/delete-user',
    GET_EPIDEMIC_DATA_OF_ALL_PROVINCES: '/api/get-epidemic-data-of-all-provinces',
};

export const role = {
    ADMIN: 0,
    EXPERT: 1,
    GUEST: 2,
};

export const loginCondition = {
    LOGIN_SUCCESS: 0,
    EMAIL_NOT_EXIST: 1,
    FAILED_PASSWORD: 2,
};

export const errorCode = {
    NO_ERROR: 0,
    LOGIN_FAILED: 1,
}

export const menuItems = {
    ACCOUNT_MANAGE: "Quản lý tài khoản",
    CREATE_ACCOUNT: "Tạo tài khoản mới",
    MODIFY_ACCOUNT: "Chỉnh sửa tài khoản",
    DELETE_ACCOUNT: "Xóa tài khoản",
    EPIDEMIC_ANALYSE: "Phân tích tình hình dịch bệnh",
    SUPPLIES_ANALYSE: "Phân tích khả năng hỗ trợ VTYT",
    DISTRIBUTION_ANALYSE: "Phân tích tuyến đường phân bổ VTYT",
    DB_MODYFY: "Thêm dữ liệu",
    EPIDEMIC_DISPLAY: "Tra cứu tình hình dịch bệnh",
    SUPPLIES_DISPLAY: "Tra cứu khả năng cung ứng VTYT",
    DISTRIBUTION_DISPLAY: "Tra cứu tuyến đường cung ứng VTYT",
}

export const sidebarMenu = [
    // ADMIN:
    [
        menuItems.ACCOUNT_MANAGE
    ],
    // EXPERT:
    [
        menuItems.EPIDEMIC_ANALYSE,
        menuItems.SUPPLIES_ANALYSE,
        menuItems.DISTRIBUTION_ANALYSE,
        menuItems.DB_MODYFY
    ],
    // GUEST:
    [
        menuItems.EPIDEMIC_DISPLAY,
        menuItems.SUPPLIES_DISPLAY,
        menuItems.DISTRIBUTION_DISPLAY
    ],
]