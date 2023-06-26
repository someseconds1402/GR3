const reader = require('./../../../data/function/readfile/readfile')

const queryEpidemicData = async(province_id, pandemic_id, date) => {
    const myDate = new Date(date)
    const getDateRangeData = e => {
        const eDate = new Date(e.date);
        const diffDays = Math.ceil((myDate.getTime() - eDate.getTime()) / (1000 * 3600 * 24));
        return e.province_id == province_id && diffDays >= 1 && diffDays <= 7;
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

const queryEpidemicDataOfAllProvinces = async(pandemic_id, date) => {
    const myDate = new Date(date)
    const provinces = await reader.readProvince();
    const infection = await reader.readInfectionSituation();
    const recovered = await reader.readRecoveredSituation();
    const death = await reader.readDeathSituation();

    const getDateRangeData = (e, province_id) => {
        const eDate = new Date(e.date);
        const diffDays = Math.ceil((myDate.getTime() - eDate.getTime()) / (1000 * 3600 * 24));
        return e.province_id == province_id && diffDays >= 1 && diffDays <= 7;
    }

    const result = provinces.map((province) => {
        const infectionList = infection.filter(e => getDateRangeData(e, province.province_id));
        const recoveredList = recovered.filter(e => getDateRangeData(e, province.province_id));
        const deathList = death.filter(e => getDateRangeData(e, province.province_id));
        return {
            province_id: province.province_id,
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
    })
    return result;
}

const querySupplyQuantityOfAllProvinces = async(pandemic_id) => {
    const provinces = await reader.readProvince();
    const supply_quantity = await reader.readSupplyQuantity();
    const medical_supplies = await reader.readMedicalSupply();
    return provinces.map(province => {
        const dataQuantity = supply_quantity.filter(e => e.province_id == province.province_id)
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
        return {
            province_id: province.province_id,
            level: dataQuantity[0].quantity % 3 + 1,
            data: dataQuantity
        }
    })
}

module.exports = {
    queryEpidemicData,
    queryPandemicData,
    querySupplyQuantity,
    queryAllEmail,
    queryEpidemicDataOfAllProvinces,
    querySupplyQuantityOfAllProvinces,

}