const express = require ('express');
const connectDB = require('./config/db');

const app = express();
const cors = require("cors")

// Connect Database
connectDB();

// Init Middleware
app.use(cors());
app.use(express.json({extended: false}))


app.get('/', (req, res) => 
res.json({msg: 'welcome'}))

app.use('/api/user', require('./resources/auth'));
app.use('/api/contact', require('./resources/contact'));

const port = process.env.PORT || 3001;

app.listen(port, () => console.log(`Server started on ${port} `));