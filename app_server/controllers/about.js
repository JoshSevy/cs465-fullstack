/**
 * Controller for the about page.
 * @param req
 * @param res
 */
const about = (req, res) => {
    res.render('about', { title: 'About Travlr' });
};

/**
 * Exports the about controller.
 * @type {{about: about}}
 */
module.exports = {
    about
};