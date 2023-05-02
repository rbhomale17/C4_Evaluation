const express = require("express");
const rateLimit = require('express-rate-limit')

const limiter = rateLimit({
	// ...
	max: async (request, response,next) => {
	    // next();
        console.log("limiter");
        return 5
	},
})


module.exports = {limiter}