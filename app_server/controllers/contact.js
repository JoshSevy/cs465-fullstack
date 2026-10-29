/**
 * Controller for the contact page.
 * @param req
 * @param res
 */
const contact = (req, res) => {
    res.render('contact', { title: 'Contact Us', currentRoute: req.baseUrl || '/' });
};

/**
 * Exports the contact controller.
 * @type {{contact: contact}}
 */
module.exports = {
    contact
};