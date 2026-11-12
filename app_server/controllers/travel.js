/**
 * Controller for the travel page.
 * @param req
 * @param res
 */
const travel = (req, res) => {
    res.render('travel', { title: 'Travlr Getaways' });
};

/**
 * Exports the travel controller.
 * @type {{travel: travel}}
 */
module.exports = {
    travel
};