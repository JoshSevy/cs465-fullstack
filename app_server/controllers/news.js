/**
 * Controller for the news page.
 * @param req
 * @param res
 */
const news = (req, res) => {
    res.render('news', { title: 'Travlr News' });
};

/**
 * Exports the news controller.
 * @type {{news: news}}
 */
module.exports = {
    news
};
