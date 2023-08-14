const reader = require('./../../../data/function/readfile/readfile')
const dijkstra = require('./../../dijkstra/dijkstra')
const Graph = require('./../../dijkstra/Graph')
const GGraph = require('./../../dijkstra/GGraph')
const hungarianAlgorithm = require('./../../hungarian/hungarian')

const queryEpidemicData = async(province_id, pandemic_id, date) => {
    const myDate = new Date(date)
    const getDateRangeData = e => {
        const eDate = new Date(e.date);
        const diffDays = Math.ceil((myDate.getTime() - eDate.getTime()) / (1000 * 3600 * 24));
        return e.province_id == province_id && e.pandemic_id == pandemic_id && diffDays >= 1 && diffDays <= 7;
    }
    const infectionList = (await reader.readInfectionSituation()).filter(e => getDateRangeData(e))
    const recoveredList = (await reader.readRecoveredSituation()).filter(e => getDateRangeData(e))
    const deathList = (await reader.readDeathSituation()).filter(e => getDateRangeData(e))
    const levelList = (await reader.readLevel()).filter(e => getDateRangeData(e))
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
        },
        level: {
            title: 'Cấp độ dịch',
            list: levelList
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
    const supply_ability = await reader.readSupplyAbility();

    const listSupplyTypeId = pandemic.find(e => e.pandemic_id == pandemic_id).supply_type;

    return listSupplyTypeId.map(type_id => {
        const typeInfo = supply_type.find(type => type.id == type_id);
        const listSupply = medical_supplies.filter(spl => spl.supply_type_id == type_id);
        const supplyAbility = supply_ability.find(sa => sa.province_id == province_id && sa.pandemic_id == pandemic_id && sa.supply_type_id == type_id);
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
            supply_quantity: listQuantity,
            total_quantity: supplyAbility ? supplyAbility.supply_quantity : -1,
            ability: supplyAbility ? supplyAbility.ability : 0,
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
    const infection = await reader.readInfectionSituation();
    const recovered = await reader.readRecoveredSituation();
    const death = await reader.readDeathSituation();

    const getDateRangeData = (e, province_id) => {
        const eDate = new Date(e.date);
        const diffDays = Math.ceil((myDate.getTime() - eDate.getTime()) / (1000 * 3600 * 24));
        return e.province_id == province_id && e.pandemic_id == pandemic_id && diffDays >= 1 && diffDays <= 7;
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

const querySupplyAbility = async(pandemic_id, supply_type_id) => {
    const supply_ability = await reader.readSupplyAbility();

    const supplyAbilityList = supply_ability.filter(e =>
        e.pandemic_id == pandemic_id && e.supply_type_id == supply_type_id);
    // console.log(supplyAbilityList);
    return supplyAbilityList;
}

const createMatrix = async(listReceive, listSupport) => {
    let result = [];
    for (let i = 0; i < listReceive.length; i++) {
        result[i] = [];
        for (let j = 0; j < listSupport.length; j++) {
            const a = listSupport[j] < listReceive[i] ? listSupport[j] : listReceive[i];
            const b = listSupport[j] > listReceive[i] ? listSupport[j] : listReceive[i];
            result[i][j] = GGraph[a][b];
        }
    }
    return result;
}

const getDistance = async(s, e) => {
    const a = listSupport[j] < listReceive[i] ? listSupport[j] : listReceive[i];
    const b = listSupport[j] > listReceive[i] ? listSupport[j] : listReceive[i];
    return GGraph[a][b];
}

const queryDistributionData = async(listReceive, listSupport) => {
    const matrix = await createMatrix(listReceive, listSupport);
    const marks = await hungarianAlgorithm(matrix);
    const res = {};
    const test = async() => {
        marks.forEach((e, index) => {
            const recId = listReceive[index],
                supId = listSupport[e];
            if (e == -1) {
                res[recId] = -1;
            } else {
                if (!res[recId]) {
                    res[recId] = [supId];
                }
                const a = recId < supId ? recId : supId;
                const b = recId > supId ? recId : supId;
                res[recId].push(GGraph[a][b]);
            }
        })
    }
    await test();

    return {
        // matrix: matrix,
        // marks: marks,
        // listReceive: listReceive,
        // listSupport: listSupport,
        res: res
    };
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
    querySupplyAbility,
    queryDistributionData,
    queryProvinceData,
    queryMedicalSupplyData,
    querySupplyTypeData,
}