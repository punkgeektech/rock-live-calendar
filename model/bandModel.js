const mongoose = require('mongoose')

const bandSchema = mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    value: {
      type: "number",
      required: false,
      default: 0
    }
})

const Bands = module.exports = mongoose.model('bands', bandSchema);
module.exports.get = function (callback, limit) {
    Bands.find(callback).limit(limit)
}
