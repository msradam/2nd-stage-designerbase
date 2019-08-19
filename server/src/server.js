const express = require('express');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use('/api/designers', require('./routes/api/designers'));

app.use(cors());

const PORT = 8000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
