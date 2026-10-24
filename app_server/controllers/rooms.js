var fs = require('fs');
var roomsData = JSON.parse(fs.readFileSync('./data/rooms.json', 'utf8'));

/**
 * Controller for the rooms page.
 * @param req
 * @param res
 */
const rooms = (req, res) => {
    res.render('rooms', { title: 'Travlr Getaways', rooms: roomsData, currentRoute: req.baseUrl || '/' });
};

/**
 * Exports the rooms controller.
 * @type {{rooms: rooms}}
 */
module.exports = {
    rooms
};