const { exec } = require("child_process");
const path = require("path");
const fs = require("fs");

const executeHelper = (path) => {
    return new Promise((resolve, reject) => {
        exec(`cd codes && node ${path}`, (error, stdout, stderr) => {
            // console.log("error --------------", error, stdout);
            if (error) {
                reject({ error, stderr });
            }
            if (stderr) {
                reject(stderr);
            }
            resolve(stdout);
        });
    });
};

const executeCode = async (filepath, language) => {
    // const outputPath = path.join(__dirname, "outputs");
    // if (!fs.existsSync(outputPath)) {
    //     fs.mkdirSync(outputPath, { recursive: true });
    // }
    // console.log('outputPath', outputPath);

    const jobID = path.basename(filepath);
    // const outputpath = path.join(outputPath, `${jobID}`);

    if (language === "js") {
        return executeHelper(jobID);
    }
    // else if (language === "ts") {
    // } else if (language === "py") {
    // } else if (language === "java") {
    // }
};

module.exports = { executeCode };
