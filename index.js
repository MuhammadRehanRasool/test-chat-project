if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const session = require("express-session");
const Sequelize = require("sequelize");
const userRouter = require("./routes/user");
const dashboardRouter = require("./routes/dashboard");
const bodyParser = require("body-parser");
const passport = require("passport");
const flash = require("express-flash");
const { User } = require("./models");
const initializePassport = require("./passportconfig");
const { Server } = require("socket.io");
const cors = require("cors");

const path = require("path");

const http = require("http");

// const hostname = "127.0.0.1";
const port = process.env.PORT || 5000;

const express = require("express");
const app = express();
app.use(cors());
app.use(express.static(path.join(__dirname, "client", "build")));

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", function (socket) {
  console.log("A user connected");

  // Emit 'hello' event to everyone
  io.emit("hello", "Hello, everyone!");

  socket.on("newMessage", function (message) {
    // Broadcast the new message to everyone connected
    io.emit("takeUpdate", message);
  });

  socket.on("disconnect", function () {
    console.log("A user disconnected");

    // Inform everyone that someone has disconnected
    io.emit("userDisconnected", "A user has disconnected");
  });
});

// app.get("/", (req, res) => {
//   res.send("Hello from Express!");
// });

initializePassport(
  passport,
  async (username) => await User.findOne({ where: { username } }),
  async (id) => await User.findByPk(id)
);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(userRouter);
app.use(dashboardRouter);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

server.listen(port, () => {
  console.log("Backend is running....");
});
