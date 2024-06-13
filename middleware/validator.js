
const { registerSchema , loginSchema } = require("../validation/auth-validation")

exports.registerValidator = (req ,res,next) => {
    console.log('req bodyyyy',req.body)
    const {value,error} = registerSchema.validate(req.body);
    if(error) {
        return res.status(400).json({msg: error.details[0].msg})
    }
    req.input = value;
    next();
};

exports.loginValidator = (req ,res,next) => {
    const {value,error} = loginSchema.validate(req.body);
    if(error) {
        return res.status(400).json({msg: error.details[0].message})
    }
    req.input = value;
    next();
};
