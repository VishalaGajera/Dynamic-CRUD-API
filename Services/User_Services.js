const util = require('util');
const con = require('../Config/Connection');

con.queryAsync = util.promisify(con.query);

/***************** concate for key and value   ***************/
const combineKeyValue = (AllField, AllFieldValue) => {
    return AllField.map((field, index) => {
        let value = AllFieldValue[index];
        if (typeof value === 'string') {
            value = `'${value}'`;
        }
        return `${field}=${value}`;
    })
}

/***************** Dynamic columns create ***************/
const getDynamicColumns = (data) => {
    const AllField = Object.keys(data);
    const FValue = Object.values(data);
    const FieldsValue = FValue.map(val => {
        if(typeof val === 'string'){
            return val.replace(val, `'${val}'`)
        }
        return val;
    })
    return { FieldsValue, AllField, FValue }
}

/***************** common function for the Insert Data for all tables***************/
const insertData = async (table_name, AllData) => {
    if (!table_name) {
        return { success: false, message: `Table Name Are Required..` }
    }
    if (AllData) {
        let { FieldsValue, AllField } = getDynamicColumns(AllData);
        AllField = AllField.join(', ')
        const InsertQuery = `INSERT INTO ${table_name} (${AllField}) VALUES (${FieldsValue})`;
        const data = await con.queryAsync(InsertQuery);
        return { success: true, message: `Data Insert Successfully..` };
    } else {
        return { success: false, message: `Data Are Required..` }
    }
}

/***************** common function for the Fetch Data for all tables***************/
const fetchData = async (table_name) => {
    if (!table_name) {
        return { success: false, message: `Table Name Are Required..` }
    } else {
        const fetchQuery = `SELECT * FROM ${table_name}`;
        const data = await con.queryAsync(fetchQuery);
        return { success: true, message: `Data Fetch Successfully..`, data: data }
    }
}

/***************** common function for the Delete Data for all tables***************/
const deleteData = async (table_name, where) => {
    if (!table_name) {
        return { success: false, message: `Table Name Are Required...` }
    }
    if (!where) {
        return { success: false, message: `Where clause Are Required` };
    } else {
        const { AllField, FValue } = getDynamicColumns(where);
        const combinedDeleteArray = combineKeyValue(AllField, FValue).join(' AND ');
        const deleteQuery = `DELETE FROM ${table_name} WHERE ${combinedDeleteArray}`;
        const data = await con.queryAsync(deleteQuery);
        return { success: true, message: `Data Delete Successfully..` }
    }
}

/***************** common function for the Update Data for all tables***************/
const updateData = async (table_name, where, updateDataValue) => {
    if (!table_name) {
        return { success: false, message: `Table Name Are Required..` }
    }
    if (!updateDataValue) {
        return { success: false, message: `Update Data Are Required..` }
    }
    const { AllField, FValue } = getDynamicColumns(updateDataValue);
    const combinedUpdateArray = combineKeyValue(AllField, FValue);
    if (where) {
        const { AllField, FValue } = getDynamicColumns(where);
        const combinedWhereArray = combineKeyValue(AllField, FValue).join(' AND ');
        const UpdateQuery = `UPDATE ${table_name} SET ${combinedUpdateArray} WHERE ${combinedWhereArray}`;
        const data = await con.queryAsync(UpdateQuery);
        return { success: true, message: `Data Update Successfully..` }
    } else {
        return { success: false, message: `Where Clause Are Required..` }
    }
}

module.exports = { insertData, fetchData, updateData, deleteData }
