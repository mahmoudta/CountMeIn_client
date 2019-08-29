module.exports = {
	API                 : 'https://count-me-in-prod.herokuapp.com',
	// API                 : 'http://localhost:8080',
	B_IMAGES            : 'https://s3-eu-west-1.amazonaws.com/countmeinfilesnew',
	S3IMAGESCONFIG      : {
		bucketName      : 'countmeinfilesnew',
		dirName         : 'businesses',
		region          : 'eu-west-1',
		accessKeyId     : 'AKIAZBR2KYB2MFDWXLOK',
		secretAccessKey : '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'
	},
	S3IMAGESCONFIGUSERS : {
		bucketName      : 'countmeinfilesnew',
		dirName         : 'users',
		region          : 'eu-west-1',
		accessKeyId     : 'AKIAZBR2KYB2MFDWXLOK',
		secretAccessKey : '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'
	}
};
