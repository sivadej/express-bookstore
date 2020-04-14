const jsonschema = require('jsonschema');
const bookSchema = require('../schemas/bookSchema.json');

router.post('/with-validation', (req,res,next)=>{
	const result = jsonschema.validate(req.body, bookSchema);

	if (!result.valid) {
		//validation error
		let listOfErrors = result.errors.map(err => err.stack);
		let error = new ExpressError(listOfErrors, 400);
		return next(error);
	}

	const { book } = req.body;
	return res.json(book);
});