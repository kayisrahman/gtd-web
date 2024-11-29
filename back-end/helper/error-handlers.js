const handleError = (err, req, res) => {
  if (err){
    console.log(err)
    if (res != null){
      res.status(500).send({
        message: err.message
      })
    }
  }
}


module.exports = {
  handleError,
}

