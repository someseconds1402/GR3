const { loginCondition } = require('./../../data/constant/constant');
const reader = require('../../data/function/readfile/readfile')

const checkInfo = async(email, password) => {
    return new Promise(async(resolve, reject) => {
        try {
            const account = await checkEmail(email);
            const result = account ? (account.password === password ? loginCondition.LOGIN_SUCCESS : loginCondition.FAILED_PASSWORD) : loginCondition.EMAIL_NOT_EXIST;
            resolve({ loginCondition: result, roleId: !result ? account.roleId : -1 });
        } catch (err) {
            reject(err);
        }
    })
}

const checkEmail = async(email) => {
    const User = await reader.readUser();
    return User.find(e => e.email === email);
}

module.exports = checkInfo;