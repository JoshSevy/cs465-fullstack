var fs = require('fs');
var blogs = JSON.parse(fs.readFileSync('./data/blogs.json', 'utf8'));

/**
 * Controller for the home page of the application.
 * @param req
 * @param res
 */
const index = (req, res) => {
    res.render('index', { title: 'Travlr Getaways', blogs, currentRoute: req.baseUrl || '/' });
};

/**
 * Exports the home page controller.
 * @type {{index: index}}
 */
module.exports = {
    index
};