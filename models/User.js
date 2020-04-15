const mongoose = require('mongoose');
const { Schema } = mongoose;

// describe all different properties a user can have
const userSchema = new Schema({
    googleId: String,
});

// create a new collection for users, if exsits, will not overwrite 
mongoose.model('users', userSchema);