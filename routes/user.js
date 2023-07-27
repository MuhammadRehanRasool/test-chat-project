const express = require('express');
const bcrypt = require('bcrypt');
const { User } = require('./../models');
const passport = require('passport');
const router = express.Router();



// router.get("/", (req, res) => {
//     res.render("home");
//   });

  
  // router.post('/user-login', (req, res, next) => {
  //   passport.authenticate('local', (err, user, info) => {
  //     if (err) {
  //       return next(err);
  //     }
  
  //     if (!user) {
  //       req.flash('error', info.message);
  //       return res.redirect('/login'); // Redirect to the login page if authentication fails
  //     }
  
  //     req.logIn(user, (err) => {
  //       if (err) {
  //         return next(err);
  //       }
  
  //       return res.redirect('/dashboard'); // Redirect to the dashboard page if authentication succeeds
  //     });
  //   })(req, res, next);
  // });


  router.post('/user-login', passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/login',
    failureFlash: true
  }));

  
  router.post("/user-register", async (req, res) => {
    console.log(req.body)
    try {
      const { username, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await User.create({
        username,
        password: hashedPassword,
      });
      res.json(newUser);
      

    } catch (e) {
      console.log(e);
      res.status(500).json({
        message: "user not created",
      });
    }
  });
  
  router.get("/users", async (req, res) => {
    const users = await User.findAll();
    res.json(users);
    // res.render("user", {
    //   locals: {
    //     users,
    //   },
    // });
  });
  
  router.get("/users/:id", async (req, res) => {
    const oneUser = await User.findByPk(req.params.id);
    // const username = db[oneUser].username
    res.render("username", {
      locals: {
        oneUser,
      },
    });
  });
  
  router.post("/users/:id", async (req, res) => {
    //<-- updates user by id
    const { id } = req.params;
    const updatedUser = await User.update(req.body, {
      where: {
        id,
      },
    });
    res.json(updatedUser);
  });
  
  router.delete("/users/:id", async (req, res) => {
    const { id } = req.params;
    const deletedUser = await User.destroy({
      where: {
        id,
      },
    });
    res.json(deletedUser);
  });

  // router.get("/login", (req, res) => {
  //   res.render("login");
  // });

  // router.get("/register", (req, res) => {
  //   res.render("register");
  // });

 
  module.exports = router;