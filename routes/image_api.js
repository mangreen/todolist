var fs = require("fs");
var path = require('path');
var zen_id = require('zen-id').create('XXXXXXXc');
var sharp = require("sharp");

var local = require('../config/local');

var sizeObj = {
	s: 50,
	m: 100,
	l: 500
}

exports.upload = function(req, res) {
	var imgData = req.body.image;

	var base64Data = imgData.replace(/^data:image\/\w+;base64,/, "");
	var dataBuffer = new Buffer(base64Data, 'base64');

	var imgID = zen_id.generate();
	var uploadDir = path.join(__dirname, '../uploads', imgID + ".jpg");

	if (!fs.existsSync(path.join(__dirname, '../uploads'))) {
    	fs.mkdirSync(path.join(__dirname, '../uploads'))
	}

	fs.writeFile(uploadDir, dataBuffer, function(err) {
		
		if (err) {
		  	return res.send(err);
		}

	  	return res.json({
	  		link: local.domain + local.port + "/images/" + imgID
	  	});
		
	});
};

exports.fetch = function(req, res) {

	var imgID = req.params.id;
	var size = req.params.size ? sizeObj[req.params.size] : null;
	var uploadDir = path.join(__dirname, '../uploads', imgID + ".jpg");
	
	if (!fs.existsSync(uploadDir)) {
    	return res.send("Image Not Exist!!!");
	}

	return sharp(uploadDir)
				.resize(size)
				.toBuffer()
		  		.then(function(data){
		  			
					res.writeHead(200, {'Content-Type': 'image/jpg' });
				    return res.end(data, 'binary')

		  		})
		  		.catch(function(err){
		  		 	return res.send(err);
  				});
	
};