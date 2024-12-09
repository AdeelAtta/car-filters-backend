const Car = require('../models/car');

const searchCars = async (req, res) => {
    try {
        const {
            make,
            model,
            minYear,
            maxYear,
            minPrice,
            maxPrice,
            minMileage,
            maxMileage,
            page,
            limit,
            sort,
            search
        } = req.query;

        // Build query
        const query = {};

        if (search) {

            query.$text = { $search: search.trim() };

        } else {

        // Add filters if they exist
        if (make) query.make = new RegExp(make, 'i');
        if (model) query.model = new RegExp(model, 'i');
        if (minYear || maxYear) {
            query.year = {};
            if (minYear) query.year.$gte = parseInt(minYear);
            if (maxYear) query.year.$lte = parseInt(maxYear);
        }
        if (minPrice || maxPrice) {
            query.price = {};
            if (minPrice) query.price.$gte = parseInt(minPrice);
            if (maxPrice) query.price.$lte = parseInt(maxPrice);
        }
        if (minMileage || maxMileage) {
            query.mileage = {};
            if (minMileage) query.mileage.$gte = parseInt(minMileage);
            if (maxMileage) query.mileage.$lte = parseInt(maxMileage);
        }
    }

          // Handle multiple sort fields
          let sortOptions = {};
          if (sort) {
              // Split the sort string into individual sort criteria
              const sortCriteria = sort.split(',');
              sortCriteria.forEach(criteria => {
                  const [field, order] = criteria.split(':');
                  sortOptions[field] = parseInt(order); // Convert '1' or '-1' to number
              });
          } else {
              // Default sort
              sortOptions = { createdAt: -1 };
          }

        // Calculate pagination
        const skip = (parseInt(page) - 1) * parseInt(limit);

        // Execute query
        const cars = await Car.find(query)
            .skip(skip)
            .limit(parseInt(limit))
            .sort(sortOptions);

        // Get total count for pagination
        const total = await Car.countDocuments(query);

        res.json({
            success: true,
            data: cars,
            pagination: {
                current: parseInt(page),
                total: Math.ceil(total / parseInt(limit)),
                totalRecords: total
            }
        });

    } catch (error) {
        console.error('Search error:', error);
        res.status(500).json({
            success: false,
            error: 'Search failed'
        });
    }
};

module.exports = {
    searchCars
};