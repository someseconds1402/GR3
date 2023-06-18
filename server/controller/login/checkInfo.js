const { loginCondition } = require('./../../data/constant/constant');
const User = require('./../../data/db/User');

const checkInfo = (email, password) => {
    // console.log(User);
    return new Promise(async(resolve, reject) => {
        try {
            const account = await checkEmail(email);
            // console.log(account);
            const result = account ? (account.password === password ? loginCondition.LOGIN_SUCCESS : loginCondition.FAILED_PASSWORD) : loginCondition.EMAIL_NOT_EXIST;
            resolve({ loginCondition: result, roleId: !result ? account.roleId : -1 });
        } catch (err) {
            reject(err);
        }
    })
}

const checkEmail = (email) => {
    return User.find(e => e.email === email);
}

module.exports = checkInfo;