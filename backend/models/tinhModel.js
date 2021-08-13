const mongoose = require('mongoose');

const tinhSchema = new mongoose.Schema({
    name: {type: String, required: true}
},{
    timestamps:true,
});

const Tinh = mongoose.model('Tinh', tinhSchema);

module.exports = Tinh;