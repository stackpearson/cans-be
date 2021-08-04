const db = require('../database/db-config.js');

// returns all cans in the db
function allCans() {
    console.log('allCans called')
    return db('cans')
}

// returns a can by id
function findCanById(id) {
    return db('cans').where({ id }).first()
}

// takes in a user_id & returns 
function findUserCans(id) {
    return db('cans as c')
        .where('c.user_id', '=', `${id}`)
}

// stores a users can to the db
async function addCans(can) {
    try {
        const [id] = await db('cans').insert(can, 'id');
        return findCanById(id);
    } catch (error) {
        throw error;
    }
}

// takes in the can's id and removes it from the db if it exists
async function removeCan(id) {
    try {
        return db('cans')
            .where({ id })
            .del();
    } catch (error) {
       throw error; 
    }

}

// takes in updates to a user's can, updates changes in the db & returns the updated can object
async function updateCan(can) {
    try {
        const updatedCan = await db('cans as c').where('c.id', '=', can.id).update(can)
        return findCanById(can.id)
    } catch(error) {
        throw error;
    }
}

module.exports = {
    findCanById,
    addCans,
    allCans,
    findUserCans,
    removeCan,
    updateCan
}