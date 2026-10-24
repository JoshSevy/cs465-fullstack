const tripsEndpoint = "http://localhost:3000/api/trips";
const options = {
    method: "GET",
    headers: {
        "Content-Type": "application/json"
    }
};

// var fs = require('fs');
// var trips = JSON.parse(fs.readFileSync('./data/trips.json', 'utf8'));

/**
 * Controller for the travel page.
 * @param req
 * @param res
 */
const travel = async function (req, res, next) {
    // console.log('TRAVEL CONTROLLER BEGIN');
    await fetch(tripsEndpoint, options)
        .then(res => res.json())
        .then(json => {
            let message = null;
            if (!(json instanceof Array)) {
                message = "API lookup error";
                json = [];
            } else {
                message = "No trips exist in our database!";
            }
    res.render('travel', { title: 'Travlr Getaways', trips: json, message });
    })
    .catch(err => res.status(500).send(err.message));
};

/**
 * Controller for the travelDetails page.
 * @param req
 * @param res
 */
const travelDetails = async (req, res, next) =>{
    // console.log('TRAVEL DETAILS CONTROLLER BEGIN');
    const tripCode = req.params.tripCode; // Get the trip code from the request parameters

    await fetch(`${tripsEndpoint}/${tripCode}`, options)
        .then(res => res.json())
        .then(json => {
            let message = null; // Initialize a message variable to null
            if (!(json instanceof Object)) {
                message = "API lookup error"; // If the response is not an object, set an error message
                json = {}; // Set json to an empty object to avoid rendering issues
            } else {
                message = "No trip details exist in our database!"; // If the response is an object but empty, set a different message
            }
            res.render('travelDetails', { title: 'Travlr Getaways', trip: json, message }); // Render the travelDetails view with the trip data and message
        })
        .catch(err => res.status(500).send(err.message)); // Catch any errors during the fetch operation and send a 500 status with the error message
};

/**
 * Exports the travel controller.
 * @type {{travel: travel, travelDetails: travelDetails}}
 */
module.exports = {
    travel,
    travelDetails
};