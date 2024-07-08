const express = require('express');
const { fetchData, updateData, insertData, deleteData } = require('../Controllers/User_controller');
const UserRouter = express.Router();

/***************** All User routes Start ***************/
UserRouter.post('/insert_data', insertData)
UserRouter.get('/fetch_data', fetchData)
UserRouter.put('/update_data', updateData)
UserRouter.delete('/delete_data', deleteData)
/***************** All User routes End ***************/

module.exports = UserRouter;
