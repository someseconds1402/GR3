const infection_situation = require('./../../../data/db/infection_situation')
const recovered_situation = require('./../../../data/db/recovered_situation')
const death_situation = require('./../../../data/db/death_situation')
const pandemic = require('./../../../data/db/pandemic')
const province = require('./../../../data/db/province')

const queryEpidemicData = (province_id, pandemic_id, date) => {
    const myDate = new Date(date)
    const getDateRangeData = e => {
        const eDate = new Date(e.date);
        const diffDays = Math.ceil((myDate.getTime() - eDate.getTime()) / (1000 * 3600 * 24));
        return e.province_id == province_id && diffDays >= 0 && diffDays <= 6;
    }
    const infectionList = infection_situation.filter(e => getDateRangeData(e))
    const recoveredList = recovered_situation.filter(e => getDateRangeData(e))
    const deathList = death_situation.filter(e => getDateRangeData(e))
    return {
        infection: infectionList,
        recovered: recoveredList,
        death: deathList
    };
}

module.exports = {
    queryEpidemicData,
}