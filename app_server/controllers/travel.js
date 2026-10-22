var fs = require('fs');
var trips = JSON.parse(fs.readFileSync('./data/trips.json', 'utf8'));

/**
 * Controller for the travel page.
 * @param req
 * @param res
 */
const travel = (req, res) => {
    res.render('travel', { title: 'Travlr Getaways', trips });
};

/**
 * Exports the travel controller.
 * @type {{travel: travel}}
 */
module.exports = {
    travel
};