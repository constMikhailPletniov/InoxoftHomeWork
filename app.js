const path = require('path');
const fs = require('fs');
const util = require('util');

const boysPath = (path.join(__dirname, 'boys'));
const girlPath = (path.join(__dirname, 'girls'));
const readPromise = util.promisify(fs.readFile);
const renamePromise = util.promisify(fs.rename);

fs.readdir(boysPath, (err, files) => {
    if (err) {
        console.log(err);
        return;
    }
    files.forEach(elem => {
        const currentFile = path.join(__dirname, 'boys', elem);
        readPromise(currentFile).then(data => {
            data = JSON.parse(data);
            for (let key in data) {
                if (data[key] === "female") {
                    renamePromise(currentFile, path.join(girlPath, elem)).catch(err => console.log(err));
                }
            }

        })
    });
    fs.readdir(girlPath, (err, girlFiles) => {
        if (err) {
            console.log(err);
            return;
        }
        girlFiles.forEach(values => {
            const girlCurrentFile = path.join(__dirname, 'girls', values);
            readPromise(girlCurrentFile).then(girlData => {
                girlData = JSON.parse(girlData);
                for (let key in girlData) {
                    if (girlData[key] === "male") {
                        renamePromise(girlCurrentFile, path.join(boysPath, values)).catch(err => console.log(err));
                    }
                }
            })
        });
    })
});


