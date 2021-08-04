const router = require('express').Router();
const Cans = require('./cans-model.js');
const restricted = require('../utils/restricted-endpoint.js');

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
        .then(userCans => {
            res.status(200).json(userCans)
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


router.post('/', restricted, async (req, res) => {
    let can_name = req.body.can_name;
    let can_text = req.body.can_text;
 

    let serviceDetails = {
        'service_name': serviceName,
        'service_date': serviceDate,
        'service_mileage': serviceMileage,
        'next_service_date': nextServiceDate,
        'next_service_mileage': nextServiceMileage,
        'service_notes': serviceNotes
    }
    let vehicle_id = req.body.vehicle_id;
    let user_id = req.body.user_id;

    const savedService = await Cans.addServices(serviceDetails)
    
    const serviceRelation = {
        user_id: user_id,
        vehicle_id: vehicle_id,
        service_id: savedService.id
    }

    const savedRelation = await Cans.addServiceRelation(serviceRelation)
    
    try {
        if (savedRelation) {
            res.status(201).json({serviceAdded: savedService, savedRelation: savedRelation })
        } else {
            res.status(500).json({message: 'server error from services router, vehicle not added'})
            console.log(error)
        }
        
        
        
    } catch (err) {
        next({apiCode:500, apiMessage:'error adding service from service router', ...err})
    }
})

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