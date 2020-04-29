const User = require('../models/User');

module.exports = {
    async addUser(userDetails){
        const {sub, email, given_name, family_name, picture} = userDetails;
        const newUser = new User({
            googleId : sub,
            email,
            first_name : given_name,
            last_name : family_name,
            image_url : picture
        });
        let saveUser = await newUser.save();
        return saveUser;
    },
    async findUser(sub){
        const user = await User.findOne({
            googleId : sub
        });
        if(user)
            return user;
        else 
            return null;
    }
}