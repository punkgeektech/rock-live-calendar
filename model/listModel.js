const mongoose = require('mongoose')

const listSchema = mongoose.Schema({
    date: {
      type: String,
      required: false
    },
    bands: Array,
    location: {
      type: String,
      required: false
    }
})

const Lists = module.exports = mongoose.model('lists', listSchema);
module.exports.get = function (callback, limit) {
    Lists.find(callback).limit(limit)
}
