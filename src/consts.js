module.exports = {
	// API                 : 'https://count-me-in-prod.herokuapp.com',
	API                 : 'http://localhost:8080',
	B_IMAGES            : 'https://s3-eu-west-1.amazonaws.com/countmeinfilesnew',
	S3IMAGESCONFIG      : {
		bucketName      : 'countmeinfilesnew',
		dirName         : 'businesses',
		region          : 'eu-west-1',
		accessKeyId     : 'AKIAZBR2KYB2MPQF4WWA',
		secretAccessKey : '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'
	},
	S3IMAGESCONFIGUSERS : {
		bucketName      : 'countmeinfilesnew',
		dirName         : 'users',
		region          : 'eu-west-1',
		accessKeyId     : 'AKIAZBR2KYB2MPQF4WWA',
		secretAccessKey : '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'
	}
};
