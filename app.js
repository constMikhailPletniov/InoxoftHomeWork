const path = require('path');
const fs = require('fs');
const util = require('util');

const boysPath = (path.join(__dirname, 'gender', 'boys'));
const girlPath = (path.join(__dirname, 'gender', 'girls'));
const readPromise = util.promisify(fs.readFile);
const renamePromise = util.promisify(fs.rename);

function searchFile(dir) {
    fs.readdir(dir, (err, data) => {

        if (err) {
            return console.log(err);
        }

        data.forEach(values => {
            const currentData = path.join(dir, values);

            if (fs.statSync(currentData, values).isFile()) {

                readPromise(currentData).then(data => {
                    data = JSON.parse(data);

                    for (const key in data) {

                        if (data[key] === "female") {
                            renamePromise(currentData, path.join(girlPath, values)).catch(err => console.log(err));
                        }
                        if (data[key] === "male") {
                            renamePromise(currentData, path.join(boysPath, values)).catch(err => console.log(err));
                        }
                    }
                });
            }
            if (fs.statSync(currentData, values).isDirectory()) return searchFile(currentData);
        });
    });
}

searchFile(path.join(__dirname, 'gender'));


