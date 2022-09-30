function validateForm(validations) {
  /* validations will just be an array of expressions to evaluate in boolean
    
    */

  return validations.map((validation) => {
    if (!validation.expression()) {
      return {
        name: validation.name,
        error: validation.error,
      }
    }
    return null
  })
}

export default validateForm
