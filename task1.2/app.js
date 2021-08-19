const path = require('path');
const fs = require('fs');
const util = require('util');

const renamePromise = util.promisify(fs.rename);


function searchFile(directory) {
    fs.readdir(directory, (err, data) => {
        if (err) {
            return console.log(err);
        }
        data.forEach(values => {
            const currentData = path.join(directory, values);
            if (fs.statSync(currentData).isFile()) {
                renamePromise(currentData, path.join(__dirname, values)).catch(err => console.log(err));
            }
            if (fs.statSync(currentData).isDirectory()) return searchFile(currentData);
        });

    });
}
searchFile(__dirname);
