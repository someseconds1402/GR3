const queries = require('./query/queries')

const getEpidemicData = async(req, res) => {
    // console.log(req.body);
    const { province_id, pandemic_id, date } = req.body;
    console.log(123);
    let result = await queries.queryEpidemicData(province_id, pandemic_id, date);
    console.log(result);
    console.log(456);
    res.status(200).json(result)
}

module.exports = {
    getEpidemicData
};