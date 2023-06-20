const queries = require('./query/queries')

const getEpidemicData = async(req, res) => {
    const { province_id, pandemic_id, date } = req.body;
    let result = await queries.queryEpidemicData(province_id, pandemic_id, date);
    res.status(200).json(result)
}

const getPandemicData = async(req, res) => {
    let result = await queries.queryPandemicData();
    res.status(200).json(result)
}

module.exports = {
    getEpidemicData,
    getPandemicData,
};