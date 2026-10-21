var fs = require('fs');
var mealsData = JSON.parse(fs.readFileSync('./data/meals.json', 'utf8'));

/**
 * Controller for the meals page.
 * @param req
 * @param res
 */
const meals = (req, res) => {
    res.render('meals', { title: 'Travlr Getaways', meals: mealsData });
};

/**
 * Exports the meals controller.
 * @type {{meals: meals}}
 */
module.exports = {
    meals
};