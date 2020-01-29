const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcryptjs')

const UserSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    date: { type: Date, default: Date.now }
});

//cifra la contaseña
UserSchema.methods.encryptPassword = async(password) => {
    const salt = await bcrypt.genSalt(10);
    const hash = bcrypt.hash(password, salt);
    return hash;
};

//cuando se logea y se compara con la base de datos
UserSchema.methods.matchPassword = async function(password) {
    return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', UserSchema);