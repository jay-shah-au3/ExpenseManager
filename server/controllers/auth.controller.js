const axios = require('axios');
const userController = require('../controllers/user.controller');

module.exports = {
    async googleSignIn(req, res) {
        try {
            const authHeader = req.headers['authorization'];
            const tokenId = authHeader && authHeader.split(' ')[1];    
            let url = `https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${tokenId}`;
            const response = await axios.get(url);            
            const result = response.data;
            const {sub, email, given_name, family_name, picture} = result;
            let userExists = await userController.findUser(sub); 
            if(!userExists){    
                userExists = await userController.addUser(result);
            } 
            const jwt = require("jsonwebtoken");
            const token = jwt.sign(
                {
                    userId : userExists._id,
                    first_name : given_name,
                    last_name : family_name,
                    image_url : picture, 
                },
                process.env.JWT_TOKEN_SECRET
            );
            res.json({token});
        }
        catch(error){
            res.status(500).json({error:"Something Broke"})            
        }
    }
}
