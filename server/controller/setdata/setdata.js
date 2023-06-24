const modifyFunc = require('./modify/func')

const addUser = async(req, res) => {
    const { email, password } = req.body;
    const errCode = await modifyFunc.addUser(email, password);
    res.status(200).json({
        errorCode: errCode,
        email: email,
    })
}

const setData = {
    addUser,

}

module.exports = setData;