const express = require('express');
const router = express.Router();





// Upload file
const upload = require('app/hellper/uploadimage');


// Controller
const episodeController = require('app/http/controllers/admin/episodeController');


// Validation
const episodeValidation = require('app/validation/episodeValidation');




router.get('/', episodeController.index);

router.get('/create', episodeController.create);
router.post('/create', episodeValidation.handel(), episodeController.store);

router.delete('/:id', episodeController.distroy);

router.get('/:id/edit', episodeController.edit);
router.put('/:id', episodeValidation.handel(), episodeController.update);




// edit

module.exports = router; 