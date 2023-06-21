const infection_situation = require('./../../../data/db/infection_situation')
const recovered_situation = require('./../../../data/db/recovered_situation')
const death_situation = require('./../../../data/db/death_situation')
const pandemic = require('./../../../data/db/pandemic')
const province = require('./../../../data/db/province')
const medical_supplies = require('./../../../data/db/medical_supplies')
const supply_quantity = require('./../../../data/db/supply_quantity')

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
        dateRange: infectionList.map(e => e.date),
        infection: {
            title: 'Lây nhiễm',
            list: infectionList
        },
        recovered: {
            title: 'Hồi phục',
            list: recoveredList
        },
        death: {
            title: 'Tử vong',
            list: deathList
        }
    };
}

const queryPandemicData = () => {
    return pandemic;
}

const querySupplyQuantity = (province_id, pandemic_id) => {
    return supply_quantity
        .filter(e => e.province_id == province_id)
        .map(e => {
            const supply = medical_supplies.find(spl => spl.supply_id == e.supply_id);
            return {
                province_id: e.province_id,
                supply_id: e.supply_id,
                supply_type: supply.supply_type,
                supply_name: supply.supply_name,
                quantity: e.quantity
            }
        })
}

module.exports = {
    queryEpidemicData,
    queryPandemicData,
    querySupplyQuantity
}