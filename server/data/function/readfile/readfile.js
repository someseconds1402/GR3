const fs = require('fs');
const path = require('path');

const filePathUser = path.join(__dirname, '/../../db/User.js');
const filePathProvince = path.join(__dirname, '/../../db/province.js');
const filePathDistance = path.join(__dirname, '/../../db/distance.js');
const filePathPandemic = path.join(__dirname, '/../../db/pandemic.js');
const filePathInfectionSituation = path.join(__dirname, '/../../db/infection_situation.js');
const filePathRecoveredSituation = path.join(__dirname, '/../../db/recovered_situation.js');
const filePathDeathSituation = path.join(__dirname, '/../../db/death_situation.js');
const filePathMedicalSupply = path.join(__dirname, '/../../db/medical_supplies.js');
const filePathSupplyType = path.join(__dirname, '/../../db/supply_type.js');
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

const readUser = async() => {
    try {
        const data = fs.readFileSync(filePathUser, 'utf8');
        const jsonData = JSON.parse(data);
        return jsonData;
    } catch (err) {
        console.error('Error reading user data:', err);
        return null;
    }
}

const readProvince = async() => {
    try {
        const data = fs.readFileSync(filePathProvince, 'utf8');
        const jsonData = JSON.parse(data);
        return jsonData;
    } catch (err) {
        console.error('Error reading user data:', err);
        return null;
    }
}

const readDistance = async() => {
    try {
        const data = fs.readFileSync(filePathDistance, 'utf8');
        const jsonData = JSON.parse(data);
        return jsonData;
    } catch (err) {
        console.error('Error reading user data:', err);
        return null;
    }
}

const readPandemic = async() => {
    try {
        const data = fs.readFileSync(filePathPandemic, 'utf8');
        const jsonData = JSON.parse(data);
        return jsonData;
    } catch (err) {
        console.error('Error reading user data:', err);
        return null;
    }
}

const readInfectionSituation = async() => {
    try {
        if (!fs.existsSync(filePathInfectionSituation)) {
            console.error('File not found:', filePathInfectionSituation);
            return [];
        }
        const data = fs.readFileSync(filePathInfectionSituation, 'utf8');
        const jsonData = JSON.parse(data);
        return jsonData;
    } catch (err) {
        console.error('Error reading user data:', err);
        return null;
    }
}

const readRecoveredSituation = async() => {
    try {
        if (!fs.existsSync(filePathRecoveredSituation)) {
            console.error('File not found:', filePathRecoveredSituation);
            return [];
        }
        const data = fs.readFileSync(filePathRecoveredSituation, 'utf8');
        const jsonData = JSON.parse(data);
        return jsonData;
    } catch (err) {
        console.error('Error reading user data:', err);
        return null;
    }
}

const readDeathSituation = async() => {
    try {
        if (!fs.existsSync(filePathDeathSituation)) {
            console.error('File not found:', filePathDeathSituation);
            return [];
        }
        const data = fs.readFileSync(filePathDeathSituation, 'utf8');
        const jsonData = JSON.parse(data);
        return jsonData;
    } catch (err) {
        console.error('Error reading user data:', err);
        return null;
    }
}

const readMedicalSupply = async() => {
    try {
        const data = fs.readFileSync(filePathMedicalSupply, 'utf8');
        const jsonData = JSON.parse(data);
        return jsonData;
    } catch (err) {
        console.error('Error reading user data:', err);
        return null;
    }
}

const readSupplyType = async() => {
    try {
        const data = fs.readFileSync(filePathSupplyType, 'utf8');
        const jsonData = JSON.parse(data);
        return jsonData;
    } catch (err) {
        console.error('Error reading user data:', err);
        return null;
    }
}

const readSupplyQuantity = async() => {
    try {
        const data = fs.readFileSync(filePathSupplyQuantity, 'utf8');
        const jsonData = JSON.parse(data);
        return jsonData;
    } catch (err) {
        console.error('Error reading user data:', err);
        return null;
    }
}

const readLevel = async() => {
    try {
        const data = fs.readFileSync(filePathLevel, 'utf8');
        const jsonData = JSON.parse(data);
        return jsonData;
    } catch (err) {
        console.error('Error reading user data:', err);
        return null;
    }
}

const readSupplyAbility = async() => {
    try {
        const data = fs.readFileSync(filePathSupplyAbility, 'utf8');
        const jsonData = JSON.parse(data);
        return jsonData;
    } catch (err) {
        console.error('Error reading user data:', err);
        return null;
    }
}

const reader = {
    readUser,
    readProvince,
    readDistance,
    readPandemic,
    readInfectionSituation,
    readRecoveredSituation,
    readDeathSituation,
    readMedicalSupply,
    readSupplyType,
    readLevel,
    readSupplyQuantity,
    readSupplyAbility,
}

module.exports = reader;