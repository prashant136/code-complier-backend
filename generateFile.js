const path = require("path");
const fs = require("fs");
const { v4: uuidv4 } = require('uuid');

const generateFile = async (format, code) => {
    const dirCode = path.join(__dirname, "codes");
    
    if (!fs.existsSync(dirCode)) {
        fs.mkdirSync(dirCode, { recursive: true });
    }
    const joibId = uuidv4();
    const filename = `${joibId}.${format}`;
    const filepath = path.join(dirCode, filename);
    await fs.writeFileSync(filepath, code);
    return filepath;
};

module.exports = { generateFile };
