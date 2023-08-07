const reader = require('./../../../data/function/readfile/readfile')
const writer = require('./../../../data/function/writefile/wirtefile')

const addUser = async(email, password) => {
    const User = await reader.readUser();

    // Nếu trong CSDL đã có email đó => trả về mã lỗi 1
    if (User.some(e => e.email == email)) {
        return 1;
    } else {
        await User.push({
            roleId: 1,
            email: email,
            password: password
        });
        writer.writeUser(User);
        return 0;
    }
}

const deleteUser = async(email) => {
    const User = await reader.readUser();

    // Nếu trong CSDL Không có email đó => trả về mã lỗi 1, trả về 0 nếu có tồn tại email đó và tiến hành xóa
    if (User.some(e => e.email == email)) {
        const newUser = await User.filter(e => e.email != email);
        // console.log(newUser);
        writer.writeUser(newUser);
        return 0;
    } else {
        return 1;
    }
}

const insertProvince = async(data) => {
    const province = await reader.readProvince();

    const subFunc = async() => {
        for (let i = 0; i < data.length; i++) {
            const e = data[i];
            let prov = province.find((prov) => prov.province_id == e.province_id);
            if (prov) {
                prov.population = e.population;
                prov.population_density = e.population_density;
            } else {
                return 1;
            }
        }
        return 0;
    }
    const res = await subFunc();
    writer.writeProvince(province);
    return res;
};

const insertDistance = async(data) => {
    const distance = await reader.readDistance();

    const subFunc = async() => {
        for (let i = 0; i < data.length; i++) {
            const e = data[i];
            let dist = distance.find((dist) => dist.province_id_1 == e.province_id_1 && dist.province_id_2 == e.province_id_2);
            if (dist) {
                dist.distance = e.distance;
            } else {
                return 1;
            }
        }
        return 0;
    }
    const res = await subFunc();
    writer.writeDistance(distance);

    return res;
}

const insertPandemic = async(data) => {
    const pandemic = await reader.readPandemic();
    const subFunc = async() => {
        for (let i = 0; i < data.length; i++) {
            const e = data[i].pandemic_name;
            if (!pandemic.find((pand) => pand.pandemic_name == e)) {
                pandemic.push({ pandemic_id: pandemic.length, pandemic_name: e, supply_type: [] })
            }
        }
        return 0;
    }
    const res = await subFunc();
    writer.writePandemic(pandemic);

    return res;
}

const insertSupplyType = async(data) => {
    const supplyType = await reader.readSupplyType();
    const subFunc = async() => {
        for (let i = 0; i < data.length; i++) {
            const e = data[i].name;
            if (!supplyType.find((supTp) => supTp.name == e)) {
                supplyType.push({ id: supplyType.length, name: e })
            }
        }
        return 0;
    }
    const res = await subFunc();
    writer.writeSupplyType(supplyType);

    return res;
}

const insertSupplyMapPandemic = async(data) => {
    const pandemic = await reader.readPandemic();
    const supplyType = await reader.readSupplyType();

    const subFunc = async() => {
        for (let i = 0; i < data.length; i++) {
            const e = data[i];
            let pand = pandemic.find((pand) => pand.pandemic_id == e.pandemic_id);
            if (pand && supplyType.find(st => st.id == e.supply_type_id)) {
                if (!pand.supply_type.find(st => st == e.supply_type_id)) {
                    pand.supply_type.push(e.supply_type_id);
                }
                pand.supply_type.sort();
            } else {
                return 1;
            }
        }
        return 0;
    }
    const res = await subFunc();
    writer.writePandemic(pandemic);
    return res;
}

const insertMedicalSupply = async(data) => {
    const medicalSupply = await reader.readMedicalSupply();
    const supplyType = await reader.readSupplyType();

    const subFunc = async() => {
        for (let i = 0; i < data.length; i++) {
            const e = data[i];
            if (supplyType.find(st => st.id == e.supply_type_id)) {
                if (!medicalSupply.find(ms => ms.supply_name == e.supply_name)) {
                    medicalSupply.push({
                        supply_id: medicalSupply.length,
                        supply_type_id: e.supply_type_id,
                        supply_name: e.supply_name,
                    })
                }
            } else {
                return 1;
            }
        }
        return 0;
    }
    const res = await subFunc();
    writer.writeMedicalSupply(medicalSupply);
    return res;
}


const insertInfectionSituation = async(data) => {
    const infectionList = await reader.readInfectionSituation();
    const pandemic = await reader.readPandemic();

    const subFunc = async() => {
        for (let i = 0; i < data.length; i++) {
            const e = data[i];
            let pand = pandemic.find((pand) => pand.pandemic_id == e.pandemic_id);
            if ((e.province_id > 0 && e.province_id < 64) && pand) {
                const is = infectionList.find(is => {
                    const eDate = new Date(e.date);
                    const isDate = new Date(is.date);
                    const diffDays = Math.ceil((isDate.getTime() - eDate.getTime()) / (1000 * 3600 * 24));
                    return is.province_id == e.province_id && is.pandemic_id == e.pandemic_id && diffDays == 0;
                });
                if (is) {
                    is.quantity_in_today = e.quantity_in_today;
                    is.total_quantity = e.total_quantity;
                } else {
                    const index = infectionList.findIndex(is => {
                        const eDate = new Date(e.date);
                        const isDate = new Date(is.date);
                        return is.province_id == e.province_id && is.pandemic_id == e.pandemic_id && isDate > eDate;
                    });
                    if (index == -1) {
                        infectionList.push(e);
                    } else {
                        infectionList.splice(index, 0, e);
                    }
                }
            } else {
                return 1;
            }
        }
        return 0;
    }
    const res = await subFunc();
    writer.writeInfectionSituation(infectionList);
    return res;
}

const insertRecoveredSituation = async(data) => {
    const recoveredList = await reader.readRecoveredSituation();
    const pandemic = await reader.readPandemic();

    const subFunc = async() => {
        for (let i = 0; i < data.length; i++) {
            const e = data[i];
            let pand = pandemic.find((pand) => pand.pandemic_id == e.pandemic_id);
            if ((e.province_id > 0 && e.province_id < 64) && pand) {
                const is = recoveredList.find(is => {
                    const eDate = new Date(e.date);
                    const isDate = new Date(is.date);
                    const diffDays = Math.ceil((isDate.getTime() - eDate.getTime()) / (1000 * 3600 * 24));
                    return is.province_id == e.province_id && is.pandemic_id == e.pandemic_id && diffDays == 0;
                });
                if (is) {
                    is.quantity_in_today = e.quantity_in_today;
                    is.total_quantity = e.total_quantity;
                } else {
                    const index = recoveredList.findIndex(is => {
                        const eDate = new Date(e.date);
                        const isDate = new Date(is.date);
                        return is.province_id == e.province_id && is.pandemic_id == e.pandemic_id && isDate > eDate;
                    });
                    if (index == -1) {
                        recoveredList.push(e);
                    } else {
                        recoveredList.splice(index, 0, e);
                    }
                }
            } else {
                return 1;
            }
        }
        return 0;
    }
    const res = await subFunc();
    writer.writeRecoveredSituation(recoveredList);
    return res;
}

const insertDeathSituation = async(data) => {
    const deathList = await reader.readDeathSituation();
    const pandemic = await reader.readPandemic();

    const subFunc = async() => {
        for (let i = 0; i < data.length; i++) {
            const e = data[i];
            let pand = pandemic.find((pand) => pand.pandemic_id == e.pandemic_id);
            if ((e.province_id > 0 && e.province_id < 64) && pand) {
                const is = deathList.find(is => {
                    const eDate = new Date(e.date);
                    const isDate = new Date(is.date);
                    const diffDays = Math.ceil((isDate.getTime() - eDate.getTime()) / (1000 * 3600 * 24));
                    return is.province_id == e.province_id && is.pandemic_id == e.pandemic_id && diffDays == 0;
                });
                if (is) {
                    is.quantity_in_today = e.quantity_in_today;
                    is.total_quantity = e.total_quantity;
                } else {
                    const index = deathList.findIndex(is => {
                        const eDate = new Date(e.date);
                        const isDate = new Date(is.date);
                        return is.province_id == e.province_id && is.pandemic_id == e.pandemic_id && isDate > eDate;
                    });
                    if (index == -1) {
                        deathList.push(e);
                    } else {
                        deathList.splice(index, 0, e);
                    }
                }
            } else {
                return 1;
            }
        }
        return 0;
    }
    const res = await subFunc();
    writer.writeDeathSituation(deathList);
    return res;
}

const insertLevel = async(data) => {
    const levelList = await reader.readLevel();
    const pandemic = await reader.readPandemic();

    const subFunc = async() => {
        for (let i = 0; i < data.length; i++) {
            const e = data[i];
            let pand = pandemic.find((pand) => pand.pandemic_id == e.pandemic_id);
            if ((e.province_id > 0 && e.province_id < 64) && pand) {
                const is = levelList.find(is => {
                    const eDate = new Date(e.date);
                    const isDate = new Date(is.date);
                    const diffDays = Math.ceil((isDate.getTime() - eDate.getTime()) / (1000 * 3600 * 24));
                    return is.province_id == e.province_id && is.pandemic_id == e.pandemic_id && diffDays == 0;
                });
                if (is) {
                    is.level = e.level;
                } else {
                    const index = levelList.findIndex(is => {
                        const eDate = new Date(e.date);
                        const isDate = new Date(is.date);
                        return is.province_id == e.province_id && is.pandemic_id == e.pandemic_id && isDate > eDate;
                    });
                    if (index == -1) {
                        levelList.push(e);
                    } else {
                        levelList.splice(index, 0, e);
                    }
                }
            } else {
                return 1;
            }
        }
        return 0;
    }
    const res = await subFunc();
    writer.writeLevel(levelList);
    return res;
}

const insertSupplyQuantity = async(data) => {
    const medicalSupply = await reader.readMedicalSupply();
    const supplyQuantity = await reader.readSupplyQuantity();

    const subFunc = async() => {
        for (let i = 0; i < data.length; i++) {
            const e = data[i];
            if ((e.province_id > 0 && e.province_id < 64) && medicalSupply.find(ms => ms.supply_id == e.supply_id)) {
                const sq = supplyQuantity.find(sq => sq.province_id == e.province_id && sq.supply_id == e.supply_id);
                if (sq) {
                    sq.quantity = e.quantity;
                } else {
                    const index = supplyQuantity.findIndex(sq => sq.province_id == e.province_id && sq.supply_id > e.supply_id);
                    if (index == -1) {
                        supplyQuantity.push(e);
                    } else {
                        supplyQuantity.splice(index, 0, e);
                    }
                }
            } else {
                return 1;
            }
        }
        return 0;
    }
    const res = await subFunc();
    writer.writeSupplyQuantity(supplyQuantity);
    return res;
}

const insertSupplyAbility = async(data) => {
    const supplyAbility = await reader.readSupplyAbility();
    const pandemic = await reader.readPandemic();
    const supplyType = await reader.readSupplyType();

    const subFunc = async() => {
        for (let i = 0; i < data.length; i++) {
            const e = data[i];
            if ((e.province_id > 0 && e.province_id < 64) &&
                pandemic.find(pand => pand.pandemic_id == e.pandemic_id) &&
                supplyType.find(st => st.id == e.supply_type_id)
            ) {
                const sa = supplyAbility.find(sa =>
                    sa.province_id == e.province_id && sa.pandemic_id == e.pandemic_id &&
                    sa.supply_type_id == e.supply_type_id);
                if (sa) {
                    sa.supply_quantity = e.supply_quantity;
                    sa.ability = e.ability;
                } else {
                    const index = supplyAbility.findIndex(sa =>
                        sa.province_id > e.province_id &&
                        sa.pandemic_id == e.pandemic_id &&
                        sa.supply_type_id == e.supply_type_id);
                    if (index == -1) {
                        supplyAbility.push(e);
                    } else {
                        supplyAbility.splice(index, 0, e);
                    }
                }
                // supplyAbility.sort((a, b) => {
                //     if (a.pandemic_id == b.pandemic_id) {
                //         if (a.supply_type_id == b.supply_type_id) {
                //             return a.province_id - b.province_id;
                //         }
                //         return a.supply_type_id - b.supply_type_id;
                //     }
                //     return a.pandemic_id - b.pandemic_id;
                // });
            } else {
                return 1;
            }
        }
        return 0;
    }
    const res = await subFunc();
    writer.writeSupplyAbilty(supplyAbility);
    return res;
}

const modifyFunc = {
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

module.exports = modifyFunc;