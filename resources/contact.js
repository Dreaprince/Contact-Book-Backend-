const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {check} = require('express-validator');


const {
    contact_get_all,
    contact_get_contact,
    contact_Create,
    conctact_update,
    contact_remove
} = require('../controllers/contact')




//@router   GET api/contacts
//@desc     Get  all your contacts
//@access   Private
router.get('/', auth, contact_get_all);



//@router   GET api/contacts
//@desc     Get  a single contact
//@access   Private
router.get('/:name', auth, contact_get_contact);




//@router   POST api/contacts
//@desc     Add new contact
//@access   Private
router.post('/',
[auth, [check('name','Name is required').not().isEmpty()]],contact_Create);




//@router   PUT api/contacts
//@desc     Update contacts
//@access   Private
router.put('/:id', auth, conctact_update);



//@router   DELETE api/contacts
//@desc     Delete contact
//@access   Private
router.delete('/:id', auth, contact_remove);




module.exports = router;
