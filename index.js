const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors');
const UserRouter = require('./Routes/User_routes');
const app = express();
app.use(bodyParser.json());
app.use(cors());

const PORT = 5000;

app.use('/user', UserRouter)

app.listen(PORT, () => {
    console.log(`Server is Running on PORT :${PORT}`);
})