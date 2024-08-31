// Make sure to include these imports:
const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
app.use(express.json());
app.use(bodyParser.json());
const cors = require('cors');
app.use(cors());

// app.get('/', (req, res)=>{
//     res.send('Hello World!');
// })

//const prompt = " Name 10 cricket player in india.";
const generate = async (prompt) => {
    try {
        const result = await model.generateContent(prompt);
        return result.response.text();

    } catch (err) {
        console.log(err);
    }
}

//
app.get('/api/content', async (req, res) => {
  try {
    const data = req.query.question;
    const result = await generate(data);
    res.send({
      "result": result
    });
  } catch (err) {
    console.log(err);
    res.status(500).send("Error generating content");
  }
});

// app.post('/api/content', async (req, res) => {
//   try {
//     const data = req.body.question;
//     const result = await generate(data);
//     res.send({
//       "result": result
//     });
//   } catch (err) {
//     console.log(err);
//     res.status(500).send("Error generating content");
//   }
// });


//generate();
app.listen(3000,()=>{
    console.log('Server is running on port 3000');
})