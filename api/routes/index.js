const express = require('express');
const router = express.Router();
const User=require('../../models/User');

router.get('/', (req, res, next) => {
	return res.render('index.ejs');
});

router.post('/',async(req,res)=>{
    const newUser=new User({
    unique_id:req.body.unique_id,
    email:req.body.email,
    username:req.body.username,
    password:req.body.password,
    passwordConf:req.body.passwordConf,
});
try{
    const saveUser=await newUser.save()
    res.redirect('/login');
    // res.status(200).json(saveUser);
}catch(err){
    res.status(500).json(err)
}
// res.redirect('/login');
})
router.get('/login', (req, res, next) => {
	return res.render('login.ejs');
});

router.post('/login', (req, res, next) => {
	User.findOne({ email: req.body.email }, (err, data) => {
		if (data) {
			if (data.password == req.body.password) {
                // res.send(data.username),
                res.render('data.ejs',{"name":data.username})
				// res.send({ "Success": "Success!" });
			} else {
				res.send({ "Success": "Wrong password!" });
			}
		} else {
			res.send({ "Success": "This Email Is not regestered!" });
		}
	});
});


module.exports = router;