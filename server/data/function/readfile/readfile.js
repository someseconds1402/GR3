const fs = require('fs');
const path = require('path');

const filePathUser = path.join(__dirname, '/../../../data/db/User.js');
const filePathProvince = path.join(__dirname, '/../../../data/db/province.js');
const filePathPandemic = path.join(__dirname, '/../../../data/db/pandemic.js');
const filePathInfectionSituation = path.join(__dirname, '/../../../data/db/infection_situation.js');
const filePathRecoveredSituation = path.join(__dirname, '/../../../data/db/recovered_situation.js');
const filePathDeathSituation = path.join(__dirname, '/../../../data/db/death_situation.js');
const filePathMedicalSupply = path.join(__dirname, '/../../../data/db/medical_supplies.js');
const filePathSupplyQuantity = path.join(__dirname, '/../../../data/db/supply_quantity.js');

const readUser = async() => {
    try {
        // console.log(filePath);
        const data = fs.readFileSync(filePathUser, 'utf8');
        // console.log(data);
        const jsonData = JSON.parse(data);

        // fs.writeFile(filePathUser, JSON.stringify(jsonData), (err) => {
        //     if (err) {
        //         console.error('Lỗi khi ghi file:', err);
        //     } else {
        //         console.log('Ghi file thành công.');
        //     }
        // })

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

const reader = {
    readUser,
    readProvince,
    readPandemic,
    readInfectionSituation,
    readRecoveredSituation,
    readDeathSituation,
    readMedicalSupply,
    readSupplyQuantity,
}

module.exports = reader;