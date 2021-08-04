const db = require('../database/db-config.js');


//Takes in a user_id provided via params, returns all services for that user_id
function findCans(id) {
    return db('cans as c')
        // .join('cans as c', 'uc.id')
        // .select()
        .where('c.id', '=', `${id}`)
}

function allCans() {
    console.log('allCans called')
    return db('cans')
}

function findCanById(id) {
    // console.log('findCansById called')
    return db('cans').where({ id }).first()
}

function findUserCans(id) {
    return db('cans as c')
        .where('c.user_id', '=', `${id}`)
}

async function addCans(can) {
    try {
        const [id] = await db('cans').insert(can, 'id');
        return findCanById(id);
    } catch (error) {
        throw error;
    }
}

async function removeCan(id) {
    try {
        return db('cans')
            .where({ id })
            .del();
    } catch (error) {
       throw error; 
    }

}






module.exports = {
    findCans,
    findCanById,
    addCans,
    allCans,
    findUserCans,
    removeCan
}