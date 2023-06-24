const reader = require('./../../../data/function/readfile/readfile')

const queryEpidemicData = async(province_id, pandemic_id, date) => {
    const myDate = new Date(date)
    const getDateRangeData = e => {
        const eDate = new Date(e.date);
        const diffDays = Math.ceil((myDate.getTime() - eDate.getTime()) / (1000 * 3600 * 24));
        return e.province_id == province_id && diffDays >= 0 && diffDays <= 6;
    }
    const infectionList = (await reader.readInfectionSituation()).filter(e => getDateRangeData(e))
    const recoveredList = (await reader.readRecoveredSituation()).filter(e => getDateRangeData(e))
    const deathList = (await reader.readDeathSituation()).filter(e => getDateRangeData(e))
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

const queryPandemicData = async() => {
    return reader.readPandemic();
}

const querySupplyQuantity = async(province_id, pandemic_id) => {
    const supply_quantity = await reader.readSupplyQuantity();
    const medical_supplies = await reader.readMedicalSupply();
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

const queryAllEmail = async(email) => {
    let User = await reader.readUser();
    await User.sort((a, b) => {
        if (a.email < b.email) {
            return -1;
        }
        if (a.email > b.email) {
            return 1;
        }
        return 0;
    });
    return (User.filter(e => e.email != email)).map((e, i) => {
        return {
            order: i + 1,
            email: e.email
        }
    });
}

module.exports = {
    queryEpidemicData,
    queryPandemicData,
    querySupplyQuantity,
    queryAllEmail,
}