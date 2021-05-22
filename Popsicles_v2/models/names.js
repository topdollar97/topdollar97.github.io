const mongoose = require('mongoose');
const { type } = require('os');
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
});

const Names = mongoose.model('Names', productSchema);

module.exports = Names;