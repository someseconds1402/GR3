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

const modifyFunc = {
    addUser,

}

module.exports = modifyFunc;