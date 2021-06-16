const db = require('../database/db-config.js');


//Takes in a user_id provided via params, returns all services for that user_id
function findCans(id) {
    return db('user_services as us')
        .join()
        .select()
        .where('uv.user_id', '=', `${id}`)
}

function findCanById(id) {
    return db('cans').where({ id }).first()
}

async function addCans(can) {
    try {
        const [id] = await db('cans').insert(can, 'id');
        return findCanById(id);
    } catch (error) {
        throw error;
    }
}

// async function addServiceRelation(serviceRelation) {
//    try {
//     // const service =  await db('user_vehicles').where('user_vehicles.vehicle_id', '=', `${serviceRelation.vehicle_id}`).update({service_id: `${serviceRelation.service_id}`})
//     const [id] = await db('user_vehicles').insert(serviceRelation, 'id')
//     return findRelationById(id)
//     // console.log(service)
//    } catch (error) {
//        throw error;
//    } 
// }

// async function removeService(id) {
//     try {
//         await removeServiceRelation(id)
//         return db('user_services')
//             .where({ id })
//             .del();
//     } catch (error) {
//        throw error; 
//     }

// }

// function removeServiceRelation(id) {
//     return db('user_vehicles')
//         .where('service_id', '=', `${id}`)
//         .del();
// }





module.exports = {
    findCans,
    findCanById,
    addCans
}