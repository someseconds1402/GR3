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

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})