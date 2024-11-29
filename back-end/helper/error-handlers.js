const handleError = (err, req, res) => {
  if (err){
    console.log(err)
    res.status(500).send({
      message: err.message
    })
  }
}


module.exports = {
  handleError,
}

