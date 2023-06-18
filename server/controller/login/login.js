const checkInfo = require('./checkInfo');
const { loginCondition, errorCode } = require('./../../data/constant/constant');

const login = async(req, res) => {
    const { email, password } = req.body;
    const loginCheck = await checkInfo(email, password);
    // console.log(req.body);
    res.status(200).json({
        errorCode: loginCheck.loginCondition == loginCondition.LOGIN_SUCCESS ? errorCode.NO_ERROR : errorCode.LOGIN_FAILED,
        loginCondition: loginCheck.loginCondition,
        roleId: loginCheck.roleId,
        mail: email,
        // pass: password
    })
}

module.exports = login;