const Dev = require('../models/Dev');
const parseStringToArray = require('../../utils/parseStringToArray');

module.exports = {
    async index(req, res) {
        const {longitude, latitude, techs} = req.query
        const arrayTechs = parseStringToArray(techs);
        const dev = await Dev.find({
            techs: {
                $in:arrayTechs
            },
            location: {
                $near: {
                    $geometry: {
                        type: 'Point',
                        coordinates: [longitude, latitude]
                    },
                    $maxDistance: 10000,
                }
            }
        })
        return res.json(dev)
    }
}