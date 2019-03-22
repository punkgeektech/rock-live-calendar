Bands = require('../model/bandModel')

exports.index = function (req, res) {
  Bands.get(function (err, bands) {
    if (err) {
      res.json({
        status: "error",
        message: err,
      })
    }
    res.json({
      status: "success",
      message: "Bands retrieved successfully",
      data: bands
    })
  })

  // Bands.count({}, function( err, count){
  //   console.log( "Number of bands:", count )
  // })
}

exports.new = function (data) {
  data.forEach((v) => {
    Bands.find({ name: v.name }, function(err, band) {
      if (band.length) {
        console.log(v.name, ' exists already')
      } else {
        const newband = new Bands()
        newband.name = v.name
        newband.save()
      }
    })
  })
}

exports.view = function (req, res) {
  Bands.findOne({ name: req.params.bands_name }, function (err, band) {
    if (err)
      res.send(err)
    res.json({
      message: 'Band details loading..',
      data: band
    })
  })
}

exports.update = function (req, res) {
  Bands.findOne({ name: req.params.bands_name }, function (err, band) {
    if (err)
      res.send(err)
    band.value = req.body.value

    band.save(function (err) {
      if (err)
          res.json(err)
      res.json({
          message: 'Band value updated',
          data: band
      })
    })
  })
}
