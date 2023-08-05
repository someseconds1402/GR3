const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const { PATH } = require('./data/constant/constant');

const controller = require('./controller/controller');

const app = express()
const port = 8080;

app.use(express.json());
app.use(cors({ origin: true }));

app.get('/', (req, res) => {
    res.send('Đời hư ảo đưa em vào cơn mê.')
})

app.post(PATH.API.LOGIN, controller.login);

app.post(PATH.API.GET_EPIDEMIC_DATA, controller.getData.getEpidemicData);

app.get(PATH.API.GET_PROVINCE_DATA, controller.getData.getProvinceData);

app.get(PATH.API.GET_SUPPLY_TYPE_DATA, controller.getData.getSupplyTypeData);

app.get(PATH.API.GET_MEDICAL_SUPPLY_DATA, controller.getData.getMedicalSupplyData);

app.get(PATH.API.GET_PANDEMIC_DATA, controller.getData.getPandemicData);

app.post(PATH.API.GET_SUPPLY_QUANTITY, controller.getData.getSupplyQuantity);

app.post(PATH.API.GET_ALL_EMAIL, controller.getData.getAllEmail);

app.post(PATH.API.ADD_USER, controller.setData.addUser);

app.post(PATH.API.DELETE_USER, controller.setData.deleteUser);

app.post(PATH.API.GET_EPIDEMIC_DATA_OF_ALL_PROVINCES, controller.getData.getEpidemicDataOfAllProvinces);

app.post(PATH.API.GET_SUPPLY_QUANTITY_OF_ALL_PROVINCES, controller.getData.getSupplyQuantityOfAllProvinces);

app.post(PATH.API.CLUSTER, controller.cluster.cluster);

app.post(PATH.API.INSERT_SUPPLY_ABILITY, controller.setData.insertSupplyAbility);

app.post(PATH.API.GET_DISTRIBUTION_DATA, controller.getData.getDistributionData);


app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})