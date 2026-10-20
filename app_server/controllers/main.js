/**
 * Controller for the home page of the application.
 * @param req
 * @param res
 */
const index = (req, res) => {
    res.render('index', { title: 'Travlr Getaways' });
};

/**
 * Exports the home page controller.
 * @type {{index: index}}
 */
module.exports = {
    index
};