const reader = require('./../../../data/function/readfile/readfile')

const queryEpidemicData = async(province_id, pandemic_id, date) => {
    const myDate = new Date(date)
    const getDateRangeData = e => {
        const eDate = new Date(e.date);
        const diffDays = Math.ceil((myDate.getTime() - eDate.getTime()) / (1000 * 3600 * 24));
        return e.province_id == province_id && diffDays >= 1 && diffDays <= 7;
    }
    const infectionList = (await reader.readInfectionSituation(pandemic_id)).filter(e => getDateRangeData(e))
    const recoveredList = (await reader.readRecoveredSituation(pandemic_id)).filter(e => getDateRangeData(e))
    const deathList = (await reader.readDeathSituation(pandemic_id)).filter(e => getDateRangeData(e))
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
    const pandemic = await reader.readPandemic();
    const supply_type = await reader.readSupplyType();
    const medical_supplies = await reader.readMedicalSupply();
    const supply_quantity = await reader.readSupplyQuantity();

    const listSupplyTypeId = pandemic.find(e => e.pandemic_id == pandemic_id).supply_type;

    return listSupplyTypeId.map(type_id => {
        const typeInfo = supply_type.find(type => type.id == type_id);
        const listSupply = medical_supplies.filter(spl => spl.supply_type_id == type_id);
        let listQuantity = [];
        listSupply.forEach(e => {
            const quantityInfo = supply_quantity.find(m => m.province_id == province_id && e.supply_id == m.supply_id);
            if (quantityInfo) {
                listQuantity.push({
                    supply_id: e.supply_id,
                    supply_name: e.supply_name,
                    quantity: quantityInfo.quantity
                })
            }
        })

        return {
            supply_type_id: type_id,
            supply_type_name: typeInfo.name,
            supply_quantity: listQuantity
        };
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
    const infection = await reader.readInfectionSituation(pandemic_id);
    const recovered = await reader.readRecoveredSituation(pandemic_id);
    const death = await reader.readDeathSituation(pandemic_id);

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
            population: province.population,
            population_density: province.population_density,
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
    const pandemic = await reader.readPandemic();
    const supply_type = await reader.readSupplyType();
    const medical_supplies = await reader.readMedicalSupply();
    const supply_quantity = await reader.readSupplyQuantity();

    const listSupplyTypeId = pandemic.find(e => e.pandemic_id == pandemic_id).supply_type;
    //console.log(listSupplyTypeId);
    const listSupplyType = listSupplyTypeId.map(e => { return supply_type.find(m => m.id == e) });

    return {
        listSupplyType: listSupplyType,
        data: provinces.map(province => {
            const dataQuantity = listSupplyTypeId.map(type_id => {
                const typeInfo = supply_type.find(type => type.id == type_id);
                const listSupply = medical_supplies.filter(spl => spl.supply_type_id == type_id);
                let listQuantity = 0;
                listSupply.forEach(e => {
                    const quantityInfo = supply_quantity.find(m => m.province_id == province.province_id && e.supply_id == m.supply_id);
                    if (quantityInfo) {
                        listQuantity += quantityInfo.quantity;
                    }
                })

                return {
                    supply_type_id: type_id,
                    supply_type_name: typeInfo.name,
                    supply_quantity: listQuantity
                };
            })
            return {
                province_id: province.province_id,
                population: province.population,
                population_density: province.population_density,
                level: (province.population * 17 + 117) % 3 + 1,
                data: dataQuantity
            }
        })
    }
}

const queryDistributionData = async(pandemic_id, supply_type_id) => {
    const supply_ability = await reader.readSupplyAbility();

    const supplyAbilityList = supply_ability.filter(e =>
        e.pandemic_id == pandemic_id && e.supply_type_id == supply_type_id);
    // console.log(supplyAbilityList);
    return supplyAbilityList;
}

const queryProvinceData = async() => {
    return reader.readProvince();
}

const queryMedicalSupplyData = async() => {
    return reader.readMedicalSupply();
}

const querySupplyTypeData = async() => {
    return reader.readSupplyType();
}

module.exports = {
    queryEpidemicData,
    queryPandemicData,
    querySupplyQuantity,
    queryAllEmail,
    queryEpidemicDataOfAllProvinces,
    querySupplyQuantityOfAllProvinces,
    queryDistributionData,
    queryProvinceData,
    queryMedicalSupplyData,
    querySupplyTypeData,
}