const {validationResult} = require('express-validator');


const User = require('../entities/user');
const Contact = require('../entities/Contact');


 // get all contacts for a user
const contact_get_all = async(req,res) => {
    try {
        const contacts = await Contact.find()
        .sort({ date: -1});
        res.json(contacts);
     } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
     }
}


// get a single contact
const contact_get_contact = async(req,res) => {
   try {
       const contacts = await Contact.findOne(req.name)
       .sort({ date: -1});
       res.json(contacts);
    } catch (err) {
       console.error(err.message);
       res.status(500).send('Server Error');
    }
}


 // create a single contact
const contact_Create = async(req, res) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		return res.status(400).json({errors: errors.array() });
	}

	const {name,email,phone,type} = req.body;

	try {
		const newContact = new Contact ({
			name,
			email,
			phone,type,
			user: req.user.id,
		});
		const contact = await newContact.save();
		res.json(contact);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
}


   // update a single contact
const conctact_update =  async (req, res) => {
   const {name, email, phone, type} = req.body;

   // Build contact object
   const contactFields = {};
   if(name) contactFields.name = name;
   if(email) contactFields.email = email;
   if(phone) contactFields.phone = phone;
   if(type) contactFields.type = type;

   try {
       let contact = await Contact.findById(req.params.id);

       if(!contact) return res.status(404).json({ msg: 'Contact not found'});

       if(contact.user.toString() !== req.user.id) {
           return res.status(401).json({ msg: 'Not authorised '});
        }

        contact = await Contact.findByIdAndUpdate(req.params.id,
            {$set: contactFields},
            {new: true});  

            res.json(contact);
      
   } catch (err) {
       console.error(err.message);
       res.status(500).send('Server Error')  
   }
}


 // remove a single contact
const contact_remove = async (req, res) => {
   try {
       let contact = await Contact.findById(req.params.id);

       if(!contact) return res.status(404).json({ msg: 'Contact not found'});

       if(contact.user.toString() !== req.user.id) {
           return res.status(401).json({ msg: 'Not authorised '});
        }
       
       await Contact.findByIdAndRemove(req.params.id);
            res.json({ msg: 'Contact remove'});
      
   } catch (err) {
       console.error(err.message);
       res.status(500).send('Server Error')  
   }
};

module.exports = {
   contact_get_all,
   contact_get_contact,
   contact_Create,
   conctact_update,
   contact_remove
}