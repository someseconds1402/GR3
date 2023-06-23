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

app.get(PATH.API.GET_PANDEMIC_DATA, controller.getData.getPandemicData);

app.post(PATH.API.GET_SUPPLY_QUANTITY, controller.getData.getSupplyQuantity);

app.post(PATH.API.GET_ALL_EMAIL, controller.getData.getAllEmail);

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})