const modifyFunc = require('./modify/func')

const addUser = async(req, res) => {
    const { email, password } = req.body;
    const errCode = await modifyFunc.addUser(email, password);
    res.status(200).json({
        errorCode: errCode,
        email: email,
    })
}

const deleteUser = async(req, res) => {
    const { email } = req.body;
    const errCode = await modifyFunc.deleteUser(email);
    res.status(200).json({
        errorCode: errCode,
        email: email,
    })
}

const insertSupplyAbility = async(req, res) => {
    const { data } = req.body;
    const errCode = await modifyFunc.insertSupplyAbility(data);
    res.status(200).json({

    })
}

const setData = {
    addUser,
    deleteUser,
    insertSupplyAbility,

}

module.exports = setData;