const express = require('express');
const cors = require('cors');
require("./Database/config");
const User = require('./Database/user');
const Product = require('./Database/product');
const Jwt = require('jsonwebtoken');
const fs = require('fs');
const jwtKey = "kumbh_Pravesh";
const app = express();
const multer = require('multer');


app.use(cors());
app.use(express.json());

const upload = multer({
    storage:multer.diskStorage({
        destination:function(req,resp,cb) {
            cb(null, "products")
        },
        filename:function(req,file, cb){
            cb(null, file.fieldname+Date.now()+ ".jpg")
        }
    })
}).single("img");

app.post("/register", async (req, resp) => {
    let user = new User(req.body);
    let result = await user.save();
    result = result.toObject();
    delete result.password;
    Jwt.sign({ result }, jwtKey, { expiresIn: "2h" }, (err, token) => {
        if (err) {
            resp.send({ result: "Something went wrong please try again after sometime" });
        }
        resp.send({ result, auth: token });
    })
})

app.post("/login", async (req, resp) => {
    if (req.body.email && req.body.password) {
        let user = await User.findOne(req.body).select("-password"); 
        if (user) {
            Jwt.sign({user}, jwtKey, {expiresIn: "2h"}, (err,token)=>{
                if(err)
                {
                    resp.send({result: "Something went wrong please try again after sometime"});
                }
                resp.send({user,auth:token});
            })
        }
        else {
            resp.send({ error: "no user found" });
        }
    }
    else{
        
        resp.send({error: "no user found"});
    }
})

app.post("/addProduct", upload, async (req,resp)=>{
    let product = new Product({
        title: req.body.title,
        category: req.body.category,
        price: req.body.price,
        desc: req.body.desc,
        img: {
            data: fs.readFileSync('products/'+req.file.filename),
            contentType: 'image/jpg'
        }
    });
    let item = await product.save();
    resp.send({item});
})


const verifyToken = (req, resp, next) => {
    let token = req.headers['authorization'];
    if (token) {
        Jwt.verify(token, jwtKey, (err, valid) => {
            if (err) {
                resp.status(401).send({ result: "Invalid token" });
            }
            else {
                next();
            }
        })
    }
    else {
        resp.status(403).send({ result: "please add token in header" });
    }
}

app.listen(5000);