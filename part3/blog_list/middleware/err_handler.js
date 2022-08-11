const errorHandler = (error, request, response, next) => {
    //console.error(error, request)//, error.message)
    if (error.name === 'CastError') {
      return response.status(400).send({ error: error.message })
    } else if (error.name === 'ValidationError') {
      return response.status(400).send({ error: `validation error - ${error.message}` })
    } else if (error.name === 'ValidationError') {
    return response.status(400).send({ error: `validation error - ${error.message}` })
    }
  
    next(error)
}

module.exports = errorHandler