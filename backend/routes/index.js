const express = require("express");
const router = express.Router();
//connection to db
const db = require("../db");
//decrypting adn encrypting passwords
const bcrypt = require("bcrypt");

//get all users
router.get("/users", async (req, res) => {
    try {
        const results = await db.query("select * from users");
        // if response is ok store data to users
        res.status(200).json({
            status: "success",
            results: results.rows.length,
            data: {
                users: results.rows
            }
        });
    } catch (error) {
        console.log(error);
    }    
});

//get a user
router.get("/users/:id", async (req, res) => {
    try {
        // in order to prevent from sql injection attack we don't use string literals
        const results = await db.query("select * from users where id = $1", [req.params.id])

        res.status(200).json({
            status: "success",
            data: {
                user: results.rows[0]
            }
        });
    } catch (error) {
        console.log(error);
    }
    
});

// create a user
router.post("/users", async (req, res) => {
    try {
        //generate salt
        const salt = await bcrypt.genSalt(10);
        //generate hashed password
        const password = await bcrypt.hash(req.body.password, salt);
        //store results in db
        const checkUser = await db.query("select * from users where name=$1", [req.body.name]);
        console.log(checkUser.rows);
        if (checkUser.rows.length === 0) {
            const results = await db.query("INSERT INTO users(name, password, role) values ($1, $2, COALESCE($3, 'user')) returning *", [
                req.body.name, password, req.body.role
            ]);    
            res.status(201).json({
                status: "success",
                data: {
                    user: results.rows[0]
                }
            });
        } else {
            res.status(409).json({ error: "This username already exists" });
        }
        
    } catch (error) {
        console.log(error);
    }
});

//sign in
router.post("/signin", async (req, res) => {
    try {
        //calling from database data with equal username
        const results = await db.query("select * from users where name = $1", [req.body.name]);
        //if resulting array/object's length is 0 return message
        if(results.rows.length === 0) {
            res.status(400).json({ error: "Invalid Password" });
        } else {
            //check for validity
            const validPassword = await bcrypt.compare(req.body.password, results.rows[0].password);
            //if valid return name&role
            if (validPassword) {
                res.cookie('userName', req.body.name);
                res.cookie('userRole', results.rows[0].role);
                res.status(200).json({ 
                    name: req.body.name,
                    role: results.rows[0].role
                });
            } else {
                res.status(400).json({ error: "Invalid Password" });
            }
        }        
    } catch (error) {
        console.log(error);
    }
});

//update a user
router.put("/users/:id", async (req, res) => {
    try {
        const results = await db.query("UPDATE users SET name = $1, role = $2 where id = $3 returning *", [
            req.body.name, req.body.role, req.params.id
        ]);
        //if success change data
        res.status(200).json({
            status: "success",
            data: {
                user: results.rows[0]
            }
        });
    } catch (error) {
        console.log(error);
    }    
});

//delete a user
router.delete("/users/:id", async (req, res) => {
    try {
        const results = await db.query("DELETE FROM users where id = $1", [req.params.id])
        res.status(204).json({
            status: "success"
        });
    } catch (error) {
        console.log(error);
    }
})

module.exports = router;