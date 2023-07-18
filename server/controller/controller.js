const login = require('./login/login');
const getData = require('./getData/getData');
const setData = require('./setdata/setdata');
const cluster = require('./cluster/cluster')

module.exports = {
    login: login,
    getData: getData,
    setData: setData,
    cluster: cluster,
}