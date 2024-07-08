const util = require('util');
const con=require('../Config/Connection')
const { insertData, fetchData, deleteData, updateData } = require('../Services/User_Services');

/***** Insert perform ********/
exports.insertData = async (req, res) => {
    try {
        const { table_name, AllData } = req.body;
        const InsertData = await insertData(table_name, AllData);
        res.send({ success: InsertData.success, message: InsertData.message })
    } catch (error) {
        res.status(500).json({ success: false, message: `Internal Server Error...${console.error(error)}` })
    }
}

/***** Get All Data ********/
exports.fetchData = async (req, res) => {
    try {
        const { table_name } = req.query;
        const FetchData = await fetchData(table_name);
        res.send({ success: FetchData.success, message: FetchData.message, data: FetchData.data })
    } catch (error) {
        res.status(500).json({ success: false, message: `Internal Server Error...${console.error(error)}` })
    }
}

/***** Delete particular data ********/
exports.deleteData = async (req, res) => {
    try {
        const { table_name, where } = req.body;
        const DeleteData = await deleteData(table_name, where);
        res.send({ success: DeleteData.success, message: DeleteData.message });
    } catch (error) {
        res.status(500).json({ success: false, message: `Internal Server Error...${console.error(error)}` })
    }
}

/***** Update data ********/
exports.updateData = async (req, res) => {
    try {
        const { table_name, where, updateDataValue } = req.body;
        const UpdateData = await updateData(table_name, where, updateDataValue);
        res.send({ success: UpdateData.success, message: UpdateData.message });
    } catch (error) {
        res.status(500).json({ success: false, message: `Internal Server Error...${console.error(error)}` })
    }
}
