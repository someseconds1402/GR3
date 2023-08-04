const fs = require('fs');
const path = require('path');

const filePathUser = path.join(__dirname, '/../../db/User.js');
const filePathProvince = path.join(__dirname, '/../../db/province.js');
const filePathPandemic = path.join(__dirname, '/../../db/pandemic.js');
const filePathInfectionSituation = path.join(__dirname, '/../../db/infection_situation.js');
const filePathRecoveredSituation = path.join(__dirname, '/../../db/recovered_situation.js');
const filePathDeathSituation = path.join(__dirname, '/../../db/death_situation.js');
const filePathMedicalSupply = path.join(__dirname, '/../../db/medical_supplies.js');
const filePathSupplyQuantity = path.join(__dirname, '/../../db/supply_quantity.js');
const filePathSupplyAbility = path.join(__dirname, '/../../db/supply_ability.js');

const getInfectionSituationPath = async(pandemic_id) => {
    return path.join(__dirname, '/../../db/infection_situation_' + pandemic_id + '.js');
}
const getRecoveredSituationPath = async(pandemic_id) => {
    return path.join(__dirname, '/../../db/recovered_situation_' + pandemic_id + '.js');
}
const getDeathSituationPath = async(pandemic_id) => {
    return path.join(__dirname, '/../../db/death_situation_' + pandemic_id + '.js');
}

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

const writeInfectionSituation = (jsonData, pandemic_id) => {
    try {
        fs.writeFile(getInfectionSituationPath(pandemic_id), JSON.stringify(jsonData), (err) => {
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

const writeRecoveredSituation = (jsonData, pandemic_id) => {
    try {
        fs.writeFile(getRecoveredSituationPath(pandemic_id), JSON.stringify(jsonData), (err) => {
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

const writeDeathSituation = (jsonData, pandemic_id) => {
    try {
        fs.writeFile(getDeathSituationPath(pandemic_id), JSON.stringify(jsonData), (err) => {
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
    writePandemic,
    writeInfectionSituation,
    writeRecoveredSituation,
    writeDeathSituation,
    writeMedicalSupply,
    writeSupplyQuantity,
    writeSupplyAbilty,
}

module.exports = writer;