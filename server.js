const express = require("express");
const cors = require("cors");
const app = express();
const db = require("./app/models");
const UserRoutes = require("./routes/UserRoutes")
var corsOptions = {
    origin: "http://localhost:3000"
};

app.use(cors(corsOptions));

//parse requests of content-type - application/json
app.use(express.json());

//parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({extended: true}));

//simple route

app.use("/user", UserRoutes);

// set port, listen for requests
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server running at PORT ${PORT}`);
    console.log("http://localhost:8000")
});

// In development you may need to drop existing tables and re-sync database. 
// db.sequelize.sync({force:true}).then(() => {
//     console.log("Drop and re-sync db.")
// })

db.sequelize.sync();