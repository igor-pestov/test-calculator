const app = require("express")();
const cors = require("cors")
const bodyParser = require('body-parser');

app.use(cors())
app.use(bodyParser())

app.post('/sum', (req, res) => {
    try {
        const {firstNumber, secondNumber} = req.body;
    if (!firstNumber || !secondNumber) {
        res.status(400).json({message: 'one of the fields is not filled'})
    }

    res.status(200).json(firstNumber + secondNumber)
    } catch (err) {
        res.status(500).json({message: 'error', err})
    }
    
})

app.listen(5000, () => {})