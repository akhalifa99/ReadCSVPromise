const fs = require("fs");
const { parse } = require("csv-parse");

const promises = [];

async function readLargeCSVFile(filePath){
    fs.createReadStream(filePath)
  .pipe(parse({ delimiter: ",", from_line: 2 }))
  .on("data", function (row) {
    promises.push(row);
  })
  .on("error", function (error) {
    console.log(error.message);
    
  })
  .on("end", async function () {
    await Promise.all(promises)
        .then(values => console.log(values))
    console.log("finished");
  });
}

const fp = './users.csv';

const readcsv =  readLargeCSVFile(fp).then(values => console.log(values));

