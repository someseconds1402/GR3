const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '/../../../data/db/User222.js');
const filePath2 = path.join(__dirname, '/../../../data/db/User333.js');

const readUserData = async() => {
    try {
        console.log(filePath);
        const data = fs.readFileSync(filePath, 'utf8');
        console.log(data);
        const userData = JSON.parse(data);

        fs.writeFile(filePath2, JSON.stringify(userData), (err) => {
            if (err) {
                console.error('Lỗi khi ghi file:', err);
            } else {
                console.log('Ghi file thành công.');
            }
        })

        return userData;
    } catch (err) {
        console.error('Error reading user data:', err);
        return null;
    }
}

const userData = {
    readUserData
};

module.exports = userData;