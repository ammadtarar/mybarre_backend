const fs = require('fs-extra');
const diskDirectory = './disk';
const path = require('path');

function fromDir(startPath, filter, arr) {
	if (!fs.existsSync(startPath)) {
		console.log("no dir ", startPath);
		return;
	}

	var files = fs.readdirSync(startPath);
	var p = "";
	for (var i = 0; i < files.length; i++) {
		var filename = path.join(startPath, files[i]);
		var stat = fs.lstatSync(filename);
		if (stat.isDirectory()) {
			fromDir(filename, filter, arr); //recurse
		} else if (filename.indexOf(filter) >= 0) {
			arr.push(filename)
			break;
		};
	};
};

function findFile(startPath, filter) {
	var a = []
	fromDir(startPath, filter, a)
	return a[0]
}


function deleteFile(rootDir, file) {
	return new Promise(function(resolve, reject) {

		try {
			var filePath = file.url;
			var index = filePath.lastIndexOf('/')
			var path = rootDir + "/" + findFile(diskDirectory,
				filePath.substring(
					filePath.lastIndexOf('/') + 1));
			if (file.mime.includes('vid')) {
				path = path.substring(0, path.lastIndexOf('/'));
			}
			fs.removeSync(path);
		} catch (e) {
			reject(e);
		} finally {
			resolve('File deleted');
		}
	});
}


module.exports = {
	findFile: findFile,
	fromDir: fromDir,
	deleteFile: deleteFile
};
