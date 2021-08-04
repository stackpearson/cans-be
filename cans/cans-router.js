const router = require('express').Router();
const Cans = require('./cans-model.js');
const restricted = require('../utils/restricted-endpoint.js');
const { whereNotExists } = require('../database/db-config.js');

//api/services

router.get('/test', restricted, (req, res) => {
    let test = {
        test: "test"
    }
    res.status(200).json(test)
})

//returns a list of services for the user specified in the params. Vehicle ID is supplied so they can be mapped through on the front end to match the appropriate vehicle


router.get('/all-cans', restricted, (req, res) => {
    Cans.allCans()
        .then(allCans => {
            res.status(200).json(allCans)
        })
})

router.get('/:id', restricted, (req, res) => {
    const { id } = req.params;
    Cans.findCanById(id)
        .then(can => {
            res.status(200).json(can)
        })
        .catch(err => res.send(err))
})

router.get('/user-cans/:id', restricted, (req, res) => {
    const { id } = req.params;
    Cans.findUserCans(id)
        .then(userCans => {
            res.status(200).json(userCans)
        })
        .catch(err => res.send(err))
})


router.post('/new-can/:id', restricted, async (req, res) => {
    let user_id = req.body.user_id
    let can_name = req.body.can_name;
    let can_text = req.body.can_text;
 

    let can_details = {
        'user_id': user_id,
        'can_name': can_name,
        'can_text': can_text
    }

    console.log("can_details: ", can_details)

    Cans.addCans(can_details)
        .then(newCan => {
            res.status(201).json(newCan)
        })
        .catch(err => res.send(err))

    // try {
    //     if (savedCan) {
    //         res.status(201).json({canAdded: savedCAn})
    //     } else {
    //         res.status(500).json({message: 'server error from cans-router, can not added'})
    //     }
    // } catch (err) {
    //     next({apiCode:500, apiMessage:'server error', ...err})
    // }
})

// router.post('/:id', restricted, async (req, res) => {
//     const { user_id } = req.params;
//     let can_name = req.body.can_name;
//     let can_text = req.body.can_text;
 

//     let can_details = {
//         'can_name': can_name,
//         'can_text': can_text,
//         'user_id': user_id,
//         'next_service_date': nextServiceDate,
//         'next_service_mileage': nextServiceMileage,
//         'service_notes': serviceNotes
//     }
//     let vehicle_id = req.body.vehicle_id;
//     let user_id = req.body.user_id;

//     const savedService = await Cans.addServices(serviceDetails)
    
//     const serviceRelation = {
//         user_id: user_id,
//         vehicle_id: vehicle_id,
//         service_id: savedService.id
//     }

//     const savedRelation = await Cans.addServiceRelation(serviceRelation)
    
//     try {
//         if (savedRelation) {
//             res.status(201).json({serviceAdded: savedService, savedRelation: savedRelation })
//         } else {
//             res.status(500).json({message: 'server error from services router, vehicle not added'})
//             console.log(error)
//         }
        
        
        
//     } catch (err) {
//         next({apiCode:500, apiMessage:'error adding service from service router', ...err})
//     }
// })

router.delete('/:id', (req, res) => {
    let id = req.params.id;
    Cans.removeService(id)
        .then((del) => {
            res.status(200).json({message: 'service deleted'})
        })
        .catch((err) => {
            console.log(err)
            res.status(500).json({message: 'server error', ...err})
        })

})


module.exports = router;