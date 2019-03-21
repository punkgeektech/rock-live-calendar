Lists = require('../model/listModel')

exports.index = function (req, res) {
  Lists.get(function (err, lists) {
    if (err) {
      res.json({
        status: "error",
        message: err,
      })
    }
    res.json({
      status: "success",
      message: "Bands retrieved successfully",
      data: lists
    })
  })
}

exports.new = function (data) {
  data.forEach((v) => {
    const newlist = new Lists()
    newlist.date = v.date
    newlist.bands = v.bands
    newlist.location = v.location
    newlist.save()
  })
}
