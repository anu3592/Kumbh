const express = require('express');
const cors = require('cors');
require("./Database/config");
const User = require('./Database/user');
const Product = require('./Database/product');
const Jwt = require('jsonwebtoken');
const fs = require('fs');
const jwtKey = "kumbh_Pravesh";
const app = express();
const Cart = require('./Database/cart');
const multer = require('multer');
const { verify } = require('crypto');
const router = require('./routes/payment.routes');
const Order = require('./Database/order');


app.use(cors());
app.use(express.json());

app.use('/api', router);


const upload = multer({
    storage: multer.diskStorage({
        destination: function (req, resp, cb) {
            cb(null, "products")
        },
        filename: function (req, file, cb) {
            cb(null, file.fieldname + Date.now() + ".jpg")
        }
    })
}).single("img");

/*const cartUpload = multer({
    storage:multer.diskStorage({
        destination:function(req,resp,cb) {
            cb(null, "cartImages")
        },
        filename:function(req,file, cb){
            cb(null, file.fieldname+Date.now()+ ".jpg")
        }
    })
}).single("img");*/

const cartUpload = multer();

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
            Jwt.sign({ user }, jwtKey, { expiresIn: "2h" }, (err, token) => {
                if (err) {
                    resp.send({ result: "Something went wrong please try again after sometime" });
                }
                resp.send({ user, auth: token });
            })
        }
        else {
            resp.send({ error: "no user found" });
        }
    }
    else {

        resp.send({ error: "no user found" });
    }
})

app.post("/addProduct", upload, async (req, resp) => {
    let product = new Product({
        title: req.body.title,
        category: req.body.category,
        price: req.body.price,
        desc: req.body.desc,
        size: req.body.size,
        img: {
            data: fs.readFileSync('products/' + req.file.filename),
            contentType: 'image/jpg'
        }
    });
    let item = await product.save();
    resp.send({ item });
    console.log(item);
})

app.get("/search/:key", verifyToken, async (req, resp) => {
    console.log(req.params.key);
    let result = await Product.find({
        "$or": [
            { title: { $regex: req.params.key } },
            { category: { $regex: req.params.key } }
        ]
    })
    let ans = [];
    for (let i = 0; i < result.length; i++) {
        let arr = result[i].img.data;
        let bufferData = Buffer.from(arr);
        let base64String = bufferData.toString('base64');
        ans.push({ title: result[i].title, category: result[i].category, price: result[i].price, desc: result[i].desc, size: result[i].size, img: base64String });
    }

    //console.log(ans);
    resp.send(ans);
})

app.get("/cart/:key", verifyToken, async (req, resp) => {

    let result = await Cart.find({
        "$or": [
            { email: { $regex: req.params.key } }
        ]
    });

    /*let ans = [];
    for(let i=0; i<result.length; i++)
    {
        let arr = result[i].img.data;
        let bufferData = Buffer.from(arr);
        let base64String = bufferData.toString('base64');
        ans.push({title: result[i].title, price: result[i].price, email: result[i].email, img: base64String});
    }*/

    resp.send(result);
})


app.post("/addCart", verifyToken, cartUpload.none(), async (req, resp) => {
    const { title, price, email, img } = req.body;

    // Check if the product already exists in the user's cart
    const existingItem = await Cart.findOne({ title, email });

    if (existingItem) {
        return resp.status(400).json({ message: "Item already exists in the cart" });
    }

    let cart = new Cart({
        title: req.body.title,
        price: req.body.price,
        email: req.body.email,
        quantity: req.body.quantity,
        img: req.body.img,
    });
    let result = await cart.save();
    //let cart = new Cart(req.body);
    resp.send(result);
    console.log(req.body);
})

app.delete("/deleteCartItem/:key", verifyToken, async (req, resp) => {
    let result = await Cart.deleteOne({ _id: req.params.key });
    resp.send(result);
})

app.get("/allProducts/:key", verifyToken, async (req, resp) => {
    let result = await Product.find({
        "$or": [
            { category: { $regex: req.params.key } }
        ]
    });
    let ans = [];
    for (let i = 0; i < result.length; i++) {
        let arr = result[i].img.data;
        let bufferData = Buffer.from(arr);
        let base64String = bufferData.toString('base64');
        ans.push({ title: result[i].title, price: result[i].price, img: base64String });
    }
    resp.send(ans);

})

app.get("/getAll", verifyToken, async (req, resp) => {
    let result = await Product.find();
    let ans = [];
    for (let i = 0; i < result.length; i++) {
        let arr = result[i].img.data;
        let bufferData = Buffer.from(arr);
        let base64String = bufferData.toString('base64');
        ans.push({ id: result[i]._id, title: result[i].title, price: result[i].price, img: base64String });
    }
    resp.send(ans);
})

app.delete("/deleteProduct/:key", verifyToken, async (req, resp) => {
    let result = await Product.deleteOne({ _id: req.params.key });
    resp.send(result);
})

app.get("/getAllUsers", verifyToken, async (req, resp) => {
    let result = await User.find();
    let ans = [];
    for (let i = 0; i < result.length; i++) {
        ans.push({ id: result[i]._id, name: result[i].name, email: result[i].email });
    }
    resp.send(ans);
})

app.delete("/deleteUser/:key", verifyToken, async (req, resp) => {
    let result = await User.deleteOne({ _id: req.params.key });
    resp.send(result);
})

app.delete("/deleteOrder/:key", verifyToken, async (req, resp) => {
    let result = await Order.deleteOne({ _id: req.params.key });
    resp.send(result);
})


app.put("/updateProduct/:key", upload, async (req, resp) => {

    try {
        const updateFields = {
            title: req.body.title,
            category: req.body.category,
            price: req.body.price,
            desc: req.body.desc,
            size: req.body.size,
        };

        if (req.file) {
            //updateFields.img = `/uploads/${req.file.filename}`;
            updateFields.img = {
                data: fs.readFileSync('products/' + req.file.filename),
                contentType: 'image/jpg'
            }
        }

        const updatedProduct = await Product.findByIdAndUpdate(req.params.key, updateFields, { new: true });

        resp.json(updatedProduct);
    } catch (error) {
        console.error(error);
        resp.status(500).json({ error: "Error updating product" });
    }

})

app.get("/searchDashProduct/:key", verifyToken, async (req, resp) => {
    let result = await Product.findOne({ title: req.params.key });
    let ans = [];
    if (result) {
        let arr = result.img.data;
        let bufferData = Buffer.from(arr);
        let base64String = bufferData.toString('base64');
        ans.push({ id: result._id, title: result.title, price: result.price, img: base64String });
    }
    resp.send(ans);
})

app.get("/searchDashUser/:key", verifyToken, async (req, resp) => {
    let result = await User.findOne({ name: req.params.key });
    let ans = [];
    if (result) {
        ans.push({ id: result._id, name: result.name, email: result.email });
    }
    resp.send(ans);
})

app.get("/searchDashOrder/:key", verifyToken, async (req, resp) => {
    let result = await Order.findOne({ name: req.params.key });
    let ans = [];
    if (result) {
        ans.push({ id: result._id, name: result.name, contact: result.contact, zip: result.zip, address: result.address, products: result.products, quantity: result.quantity, isPaid: result.isPaid });
    }
    resp.send(ans);
})

app.post("/checkout", verifyToken, async (req, resp) => {
    let order = new Order({
        name: req.body.name,
        contact: req.body.contact,
        email: req.body.email,
        zip: req.body.zip,
        address: req.body.address,
        products: req.body.products,
        quantity: req.body.quantity,
        isPaid: "not paid",
        orderId: req.body.orderId,
        ownerEmail: req.body.ownerEmail
    });
    let result = await order.save();
    resp.send(result);
})

app.put("/cartQuantity/:key", verifyToken, async (req, resp) => {
    let result = await Cart.updateOne(
        { _id: req.params.key },
        { $set: req.body }
    )

    resp.send(result);
})

app.post("/checkout/:key", verifyToken, async (req, resp) => {
    //console.log(req.body);

        let products = [];
        let quantity = [];
        for (let key in req.body[0]) {
            products.push(key + "");
            quantity.push(req.body[0][key]);
        }
        //console.log(products);
        let result = await Order.findOne({
            orderId: req.params.key,
            products: products,
            quantity: quantity
        });
        resp.send(result);
    
})

app.put("/paid/:key", verifyToken, async (req, resp) => {
    let result = await Order.updateOne(
        { _id: req.params.key },
        { $set: {
            orderId: req.body.orderId,
            isPaid : req.body.isPaid,
            status: req.body.status
        } }
    )
    resp.send(result);
})

app.get("/getOrders", verifyToken, async (req, resp) => {
    let result = await Order.find();
    let ans = [];
    for (let i = 0; i < result.length; i++) {
        ans.push({ id: result[i]._id, orderId: result[i].orderId, name: result[i].name, contact: result[i].contact, zip: result[i].zip, address: result[i].address, products: result[i].products, quantity: result[i].quantity, isPaid: result[i].isPaid, status: result[i].status });
    }
    resp.send(ans);
})

app.get("/getOrderById/:key", verifyToken, async (req, resp) => {
    let result = await Order.findOne({ _id: req.params.key });
    resp.send(result);
})

app.post('/getTrackOrder', verifyToken, async (req, resp)=>{
    console.log(req.body.email);
    let result = await Order.find({
        "$and": [
            {ownerEmail: req.body.email},
            {isPaid: "paid"}
        ]
    });
    console.log(result);
    resp.send(result);

})

function verifyToken(req, resp, next) {
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