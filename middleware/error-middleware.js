module.exports = (err ,req,res,next) => {
    console.log('-------error-------')
    console.log(err);
    console.log('-------error here------')
    let statusCode = err.statusCode || 500
    res.status(statusCode).json({msg : err.message})
}