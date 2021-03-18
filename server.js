const express = require("express");
const app = express();
const exphbs = require("express-handlebars");
const path = require("path");

// Serve static content for the app from the "public" directory in the application directory
app.use(express.static(path.join(__dirname, "public")));

// Parse application body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Import routes and give the server access to them
const routes = require("./controllers/burger_controller.js");

app.use(routes);

// Start our server so that it can begin listening to client requests.
const PORT = process.env.PORT || 3000;
app.listen(PORT, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log(`Server listening on: http://localhost:${PORT}`);
    }
});