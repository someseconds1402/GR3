export const PATH = {
    HOME: '/',
    LOGIN: '/login',
    LOG_OUT: '/logout',
    SYSTEM: '/system'
};

export const PATH_API = {
    BASE_URL: 'http://localhost:8080/',
    LOGIN_API: 'api/login',
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
    EPICDEMIC_DISPLAY: "Tra cứu tình hình dịch bệnh",
    SUPPLIES_DISPLAY: "Tra cứu khả năng cung ứng VTYT",
    DISTRIBUTION_DISPLAY: "Tra cứu tuyến đường cung ứng VTYT",
}

export const sidebarMenu = [
    [
        menuItems.ACCOUNT_MANAGE
    ],
    [
        menuItems.EPIDEMIC_ANALYSE,
        menuItems.SUPPLIES_ANALYSE,
        menuItems.DISTRIBUTION_ANALYSE,
        menuItems.DB_MODYFY
    ],
    [
        menuItems.EPICDEMIC_DISPLAY,
        menuItems.SUPPLIES_DISPLAY,
        menuItems.DISTRIBUTION_DISPLAY
    ],
]