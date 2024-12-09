const Car = require('../models/car');

// Sample data arrays
const makes = ['Toyota', 'Honda', 'Ford', 'BMW', 'Mercedes', 'Audi', 'Volkswagen', 'Hyundai'];
const models = {
    Toyota: ['Camry', 'Corolla', 'RAV4', 'Highlander', 'Prius'],
    Honda: ['Civic', 'Accord', 'CR-V', 'Pilot', 'HR-V'],
    Ford: ['F-150', 'Escape', 'Explorer', 'Mustang', 'Edge'],
    BMW: ['3 Series', '5 Series', 'X3', 'X5', '7 Series'],
    Mercedes: ['C-Class', 'E-Class', 'GLC', 'GLE', 'S-Class'],
    Audi: ['A3', 'A4', 'Q5', 'Q7', 'A6'],
    Volkswagen: ['Golf', 'Passat', 'Tiguan', 'Atlas', 'Jetta'],
    Hyundai: ['Elantra', 'Sonata', 'Tucson', 'Santa Fe', 'Kona']
};
const fuelTypes = ['Petrol', 'Diesel', 'Hybrid', 'Electric'];
const transmissions = ['Manual', 'Automatic', 'CVT'];
const conditions = ['New', 'Used', 'Certified Pre-Owned'];

const generateRandomCar = () => {
    const make = makes[Math.floor(Math.random() * makes.length)];
    const model = models[make][Math.floor(Math.random() * models[make].length)];
    const year = Math.floor(Math.random() * (2024 - 2015) + 2015);
    const basePrice = Math.floor(Math.random() * (80000 - 15000) + 15000);

    return {
        make,
        model,
        year,
        price: basePrice,
        mileage: year === 2024 ? 0 : Math.floor(Math.random() * (100000 - 1000) + 1000),
        fuelType: fuelTypes[Math.floor(Math.random() * fuelTypes.length)],
        transmission: transmissions[Math.floor(Math.random() * transmissions.length)],
        condition: conditions[Math.floor(Math.random() * conditions.length)]
    };
};

const seedCars = async () => {
    try {
        // Check if database is empty
        const count = await Car.countDocuments();
        
        if (count === 0) {
            console.log('Database is empty. Starting to seed cars...');
            
            // Generate and insert cars in batches of 100
            const BATCH_SIZE = 100;
            const TOTAL_CARS = 10000;
            
            for (let i = 0; i < TOTAL_CARS; i += BATCH_SIZE) {
                const carBatch = [];
                const batchSize = Math.min(BATCH_SIZE, TOTAL_CARS - i);
                
                for (let j = 0; j < batchSize; j++) {
                    carBatch.push(generateRandomCar());
                }
                
                await Car.insertMany(carBatch);
                console.log(`Inserted ${i + batchSize} cars`);
            }
            
            console.log('Finished seeding 10,000 cars!');
        } else {
            console.log(`Database already contains ${count} cars. No seeding needed.`);
        }
    } catch (error) {
        console.error('Error seeding cars:', error);
    }
};

module.exports = seedCars;