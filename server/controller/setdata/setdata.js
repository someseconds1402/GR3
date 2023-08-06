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

const insertProvince = async(req, res) => {
    const { data } = req.body;
    const errCode = await modifyFunc.insertProvince(data);
    res.status(200).json({
        errCode: errCode,
    })
}

const insertDistance = async(req, res) => {
    const { data } = req.body;
    const errCode = await modifyFunc.insertDistance(data);
    res.status(200).json({
        errCode: errCode,
    })
}

const insertPandemic = async(req, res) => {
    const { data } = req.body;
    const errCode = await modifyFunc.insertPandemic(data);
    res.status(200).json({
        errCode: errCode,
    })
}

const insertSupplyType = async(req, res) => {
    const { data } = req.body;
    const errCode = await modifyFunc.insertSupplyType(data);
    res.status(200).json({
        errCode: errCode,
    })
}

const insertSupplyMapPandemic = async(req, res) => {
    const { data } = req.body;
    const errCode = await modifyFunc.insertSupplyMapPandemic(data);
    res.status(200).json({
        errCode: errCode,
    })
}

const insertMedicalSupply = async(req, res) => {
    const { data } = req.body;
    const errCode = await modifyFunc.insertMedicalSupply(data);
    res.status(200).json({
        errCode: errCode,
    })
}

const insertInfectionSituation = async(req, res) => {
    const { data } = req.body;
    const errCode = await modifyFunc.insertInfectionSituation(data);
    res.status(200).json({
        errCode: errCode,
    })
}

const insertRecoveredSituation = async(req, res) => {
    const { data } = req.body;
    const errCode = await modifyFunc.insertRecoveredSituation(data);
    res.status(200).json({
        errCode: errCode,
    })
}

const insertDeathSituation = async(req, res) => {
    const { data } = req.body;
    const errCode = await modifyFunc.insertDeathSituation(data);
    res.status(200).json({
        errCode: errCode,
    })
}

const insertLevel = async(req, res) => {
    const { data } = req.body;
    const errCode = await modifyFunc.insertLevel(data);
    res.status(200).json({
        errCode: errCode,
    })
}

const insertSupplyQuantity = async(req, res) => {
    const { data } = req.body;
    const errCode = await modifyFunc.insertSupplyQuantity(data);
    res.status(200).json({
        errCode: errCode,
    })
}

const insertSupplyAbility = async(req, res) => {
    const { data } = req.body;
    const errCode = await modifyFunc.insertSupplyAbility(data);
    res.status(200).json({
        errCode: errCode,
    })
}

const setData = {
    addUser,
    deleteUser,

    // IMPORT DATA
    insertProvince,
    insertDistance,
    insertPandemic,
    insertSupplyType,
    insertSupplyMapPandemic,
    insertMedicalSupply,

    insertInfectionSituation,
    insertRecoveredSituation,
    insertDeathSituation,
    insertLevel,
    insertSupplyQuantity,
    insertSupplyAbility,
}

module.exports = setData;