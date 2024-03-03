const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const fs = require("fs");
const cors = require("cors");
const app = express();
const { generateFile } = require("./generateFile");
const { executeCode } = require("./executeCode");
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.json({ msg: "gdfgsd" });
});

app.post("/code-run", async (req, res) => {
    // remove codes directory with stale complied code.
    const dirCode = path.join(__dirname, "codes");
    if (fs.existsSync(dirCode)) {
        fs.rmSync(dirCode, { recursive: true });
    }
    let { language = "js", code } = req.body;
    // code = `function calcSum(arr, n, k) { 
      
    //     // Loop to consider every  
    //     // subarray of size K 
    //     for (var i = 0; i <= n - k; i++) { 
              
    //         // Initialize sum = 0 
    //         var sum = 0; 
      
    //         // Calculate sum of all elements 
    //         // of current subarray 
    //         for (var j = i; j < k + i; j++) 
    //             sum += arr[j]; 
      
    //         // Print sum of each subarray 
    //         return sum; 
    //     } 
    // } 
      
    // // Driver Code 
    // var arr = [ 1, 2, 3, 4, 5, 6 ]; 
    // var n = arr.length; 
    // var k = 3; 
      
    // // Function Call 
    // console.log(calcSum(arr, n, k)); `;


    // console.log({ code });
    

    if (!code) {
        res.status(400).json({ success: false, error: "Empty code body" });
    }
    try {
        // generates fresh complied code
        const filepath = await generateFile(language, code);
        // run that complied code
        const output = await executeCode(filepath, language);
        return res.status(200).json({ filepath, output });
    } catch (error) {
        return res.status(500).json({ error });
    }
});

app.listen(PORT, () => {
    console.log("listening on port", PORT);
});
