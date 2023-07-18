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

const insertSupplyAbility = async(data) => {
    let supplyAbility = await reader.readSupplyAbility();
    if (supplyAbility) {
        supplyAbility = supplyAbility.filter(e => {
            const findItem = data.find(m =>
                m.pandemic_id == e.pandemic_id &&
                m.province_id == e.province_id &&
                m.supply_type_id == e.supply_type_id);
            if (findItem) {
                return false;
            } else {
                return true;
            }
        })
    } else {
        supplyAbility = [];
    }
    supplyAbility.push(...data);
    writer.writeSupplyAbilty(supplyAbility);

    return 1;
}

const modifyFunc = {
    addUser,
    deleteUser,
    insertSupplyAbility,

}

module.exports = modifyFunc;