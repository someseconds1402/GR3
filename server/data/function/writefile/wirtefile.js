const fs = require('fs');
const path = require('path');

const filePathUser = path.join(__dirname, '/../../db/User.js');
const filePathProvince = path.join(__dirname, '/../../db/province.js');
const filePathDistance = path.join(__dirname, '/../../db/distance.js');
const filePathPandemic = path.join(__dirname, '/../../db/pandemic.js');
const filePathSupplyType = path.join(__dirname, '/../../db/supply_type.js');
const filePathInfectionSituation = path.join(__dirname, '/../../db/infection_situation.js');
const filePathRecoveredSituation = path.join(__dirname, '/../../db/recovered_situation.js');
const filePathDeathSituation = path.join(__dirname, '/../../db/death_situation.js');
const filePathMedicalSupply = path.join(__dirname, '/../../db/medical_supplies.js');
const filePathSupplyQuantity = path.join(__dirname, '/../../db/supply_quantity.js');
const filePathLevel = path.join(__dirname, '/../../db/level.js');
const filePathSupplyAbility = path.join(__dirname, '/../../db/supply_ability.js');

// const getInfectionSituationPath = async(pandemic_id) => {
//     return path.join(__dirname, '/../../db/infection_situation_' + pandemic_id + '.js');
// }

// const getRecoveredSituationPath = async(pandemic_id) => {
//     return path.join(__dirname, '/../../db/recovered_situation_' + pandemic_id + '.js');
// }

// const getDeathSituationPath = async(pandemic_id) => {
//     return path.join(__dirname, '/../../db/death_situation_' + pandemic_id + '.js');
// }

const writeUser = (jsonData) => {
    try {
        fs.writeFile(filePathUser, JSON.stringify(jsonData), (err) => {
            if (err) {
                console.error('Lỗi khi ghi file:', err);
            } else {
                console.log('Ghi file thành công.');
            }
        })


    } catch (err) {
        console.error('Error writeing user data:', err);
        return null;
    }
}

const writeProvince = (jsonData) => {
    try {
        fs.writeFile(filePathProvince, JSON.stringify(jsonData), (err) => {
            if (err) {
                console.error('Lỗi khi ghi file:', err);
            } else {
                console.log('Ghi file thành công.');
            }
        })
    } catch (err) {
        console.error('Error writeing user data:', err);
        return null;
    }
}

const writeDistance = (jsonData) => {
    try {
        fs.writeFile(filePathDistance, JSON.stringify(jsonData), (err) => {
            if (err) {
                console.error('Lỗi khi ghi file:', err);
            } else {
                console.log('Ghi file thành công.');
            }
        })
    } catch (err) {
        console.error('Error writeing user data:', err);
        return null;
    }
}

const writePandemic = (jsonData) => {
    try {
        fs.writeFile(filePathPandemic, JSON.stringify(jsonData), (err) => {
            if (err) {
                console.error('Lỗi khi ghi file:', err);
            } else {
                console.log('Ghi file thành công.');
            }
        })

    } catch (err) {
        console.error('Error writeing user data:', err);
        return null;
    }
}

const writeSupplyType = (jsonData) => {
    try {
        fs.writeFile(filePathSupplyType, JSON.stringify(jsonData), (err) => {
            if (err) {
                console.error('Lỗi khi ghi file:', err);
            } else {
                console.log('Ghi file thành công.');
            }
        })

    } catch (err) {
        console.error('Error writeing user data:', err);
        return null;
    }
}

const writeInfectionSituation = (jsonData) => {
    try {
        fs.writeFile(filePathInfectionSituation, JSON.stringify(jsonData), (err) => {
            if (err) {
                console.error('Lỗi khi ghi file:', err);
            } else {
                console.log('Ghi file thành công.');
            }
        })
    } catch (err) {
        console.error('Error writeing user data:', err);
        return null;
    }
}

const writeRecoveredSituation = (jsonData) => {
    try {
        fs.writeFile(filePathRecoveredSituation, JSON.stringify(jsonData), (err) => {
            if (err) {
                console.error('Lỗi khi ghi file:', err);
            } else {
                console.log('Ghi file thành công.');
            }
        })

    } catch (err) {
        console.error('Error writeing user data:', err);
        return null;
    }
}

const writeDeathSituation = (jsonData) => {
    try {
        fs.writeFile(filePathDeathSituation, JSON.stringify(jsonData), (err) => {
            if (err) {
                console.error('Lỗi khi ghi file:', err);
            } else {
                console.log('Ghi file thành công.');
            }
        })

    } catch (err) {
        console.error('Error writeing user data:', err);
        return null;
    }
}

const writeMedicalSupply = (jsonData) => {
    try {
        fs.writeFile(filePathMedicalSupply, JSON.stringify(jsonData), (err) => {
            if (err) {
                console.error('Lỗi khi ghi file:', err);
            } else {
                console.log('Ghi file thành công.');
            }
        })
    } catch (err) {
        console.error('Error writeing user data:', err);
        return null;
    }
}

const writeSupplyQuantity = (jsonData) => {
    try {
        fs.writeFile(filePathSupplyQuantity, JSON.stringify(jsonData), (err) => {
            if (err) {
                console.error('Lỗi khi ghi file:', err);
            } else {
                console.log('Ghi file thành công.');
            }
        })
    } catch (err) {
        console.error('Error writeing user data:', err);
        return null;
    }
}

const writeLevel = (jsonData) => {
    try {
        fs.writeFile(filePathLevel, JSON.stringify(jsonData), (err) => {
            if (err) {
                console.error('Lỗi khi ghi file:', err);
            } else {
                console.log('Ghi file thành công.');
            }
        })
    } catch (err) {
        console.error('Error writeing user data:', err);
        return null;
    }
}

const writeSupplyAbilty = (jsonData) => {
    try {
        fs.writeFile(filePathSupplyAbility, JSON.stringify(jsonData), (err) => {
            if (err) {
                console.error('Lỗi khi ghi file:', err);
            } else {
                console.log('Ghi file thành công.');
            }
        })
    } catch (err) {
        console.error('Error writeing user data:', err);
        return null;
    }
}

const writer = {
    writeUser,

    writeProvince,
    writeDistance,
    writePandemic,
    writeSupplyType,
    writeMedicalSupply,

    writeInfectionSituation,
    writeRecoveredSituation,
    writeDeathSituation,
    writeLevel,
    writeSupplyQuantity,
    writeSupplyAbilty,
}

module.exports = writer;