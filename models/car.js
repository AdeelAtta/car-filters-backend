// models/Car.js
const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
    make: { 
        type: String, 
        required: true,
        index: true
    },
    model: { 
        type: String, 
        required: true,
        index: true
    },
    year: { 
        type: Number, 
        required: true,
        index: true
    },
    price: { 
        type: Number, 
        required: true,
        index: true
    },
    mileage: { 
        type: Number,
        index: true
    },
    fuelType: String,
    transmission: String,
    condition: String,
}, { 
    timestamps: true 
});

carSchema.index({ make: 'text', model: 'text' });


const Car = mongoose.model('Car', carSchema);
module.exports = Car;