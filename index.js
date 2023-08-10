const express = require("express");
const mongoose = require("mongoose");
const connect = require("./connection/connect");
const retailers = require("./model/retailSchema");
const customers = require("./model/customerSchema");
const retailProducts = require("./model/retailProductSchema");
const carts = require("./model/cartSchema");
const app = express();
const orders = require("./model/orderSchema");
const cors = require("cors");
const env = require("dotenv");

env.config();
app.use("/uploads", express.static("./uploads"));
const jwt = require("jsonwebtoken");
const router = express.Router();
app.use(express.json());
const multer = require("multer");
const generateAuthToken = require("./middleware/generateToken");
const checkAuth = require("./middleware/checkAuth");
app.use(cors());
app.use(express.static(__dirname + "/public/images"));
connect();
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/images");
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString().replace(/:/g, "-") + file.originalname);
  },
});
const upload = multer({
  storage: storage,
});

app.post("/register", async (req, res) => {
  const { name, address, mobile, email, password } = req.body;
  const res1 = await retailers.findOne({ email });
  console.log(res1);
  if (res1) {
    console.log("user exists");
    res.sendStatus(400);
  } else {
    const retailer = new retailers({
      name,
      address,
      mobile,
      email,
      password,
    });
    retailer
      .save()
      .then(() => {
        console.log("stored to db");
      })
      .catch((err) => {
        console.log(err);
      });
    res.sendStatus(200);
  }
});
app.post("/retail", async (req, res) => {
  const { email, password } = req.body;
  const res2 = await retailers.find({ email, password });
  console.log(res2[0]);
  if (res2.length > 0) {
    // let token = retailers.generateAuthToken().then(()=>{
    //     console.log("generated token");
    // }).catch((err)=>{
    //     console.log(err);
    // })
    // let token = await generateAuthToken(res2._id)
    // console.log(token);

    return res.status(200).json({ data: res2[0] });
  } else {
    res.sendStatus(400);
  }
});
app.post("/custreg", async (req, res) => {
  const { name, address, mobile, email, password } = req.body;
  const res1 = await customers.findOne({ email });
  console.log(res1);
  if (res1) {
    console.log("user exists");
    res.sendStatus(400);
  } else {
    const customer = new customers({
      name,
      address,
      mobile,
      email,
      password,
    });
    customer
      .save()
      .then(() => {
        console.log("stored to db");
      })
      .catch((err) => {
        console.log(err);
      });
    res.sendStatus(200);
  }
});
app.post("/custlog", async (req, res) => {
  const { email, password } = req.body;
  const res2 = await customers.find({ email, password });
  console.log(res2[0]);
  if (res2.length > 0) {
    // token = customers.generateAuthToken().then(()=>{
    //     console.log("generated token");
    // }).catch((err)=>{
    //     console.log(err);
    // })
    // let token = await generateAuthToken(res2._id)
    // console.log(token);
    return res.status(200).json({ data: res2[0] });
  } else {
    res.sendStatus(400);
  }
});
app.post("/addProduct", upload.single("photo"), async (req, res) => {
  const addProduct = new retailProducts({
    productName: req.body.productName,
    price: req.body.price,
    productDescription: req.body.productDescription,
    category: req.body.category,
    photo: req.file.path,
    discount: req.body.discount,
    email: req.body.email,
  });

  addProduct
    .save()
    .then((result) => {
      res.status(200).json({
        success: true,
        message: "product added successfully",
        createdPRoduct: result,
      });
    })
    .catch((err) => {
      res.status(err.status || 500).json({ error: { message: err.message } });
    });
});

app.get("/getProduct", async (req, res) => {
  const res3 = await retailProducts.find();
  console.log(res3);
  return res.status(200).json({ data: res3 });
});
app.get("/getViewProduct", async (req, res) => {
  const res3 = await retailProducts.find({});
  console.log(res3);
  return res.status(200).json({ data: res3 });
});
app.post("/getViewProduct", async (req, res) => {
  const email = req.body.lemail;
  const res2 = await retailProducts.find({ email });

  return res.status(200).json({ data: res2 });
});
app.post("/deleteProduct", async (req, res) => {
  const id = req.body.item._id;
  const res2 = await retailProducts.remove({ _id: id });
  console.log(res2[0]);
  return res.status(200).json({ data: res2 });
});
app.post("/updatefetch", async (req, res) => {
  const id = req.body.id;
  const res2 = await retailProducts.find({ _id: id });

  return res.status(200).json({ data: res2 });
});

app.post("/updateproduct", upload.single("photo"), async (req, res) => {
  const id = req.body.id;
  console.log(req.body.id);
  console.log(req.body.email);
  console.log("hii");
  const updateProduct = {
    productName: req.body.productName,
    price: req.body.price,
    productDescription: req.body.productDescription,
    category: req.body.category,
    photo: req.file.path,
    discount: req.body.discount,
    email: req.body.email,
  };
  const upd = { _id: id };
  let doc = await retailProducts.findOneAndUpdate(upd, updateProduct);
  if (doc) {
    return res.status(200).json({ data: doc });
  }
});
app.post("/filter", async (req, res) => {
  const filter = req.body.filter;
  let res2;
  if (filter == "All") {
    res2 = await retailProducts.find({});
  } else {
    res2 = await retailProducts.find({ category: filter });
  }

  return res.status(200).json({ data: res2 });
});
app.post("/cart", async (req, res) => {
  console.log(req.body.data.item.email);
  const addCart = new carts({
    productName: req.body.data.productName,
    price: req.body.data.price,
    productDescription: req.body.data.productDescription,
    category: req.body.data.category,
    photo: req.body.data.photo,
    discount: req.body.data.discount,
    email: req.body.cemail,
    remail: req.body.data.item.email,
    quantity: req.body.inc,
  });

  addCart
    .save()
    .then((result) => {
      res.status(200).json({
        success: true,
        message: "product added successfully",
        createdPRoduct: result,
      });
    })
    .catch((err) => {
      res.status(err.status || 500).json({ error: { message: err.message } });
    });
});
app.post("/getCartProduct", async (req, res) => {
  const email = req.body.cemail;
  const res2 = await carts.find({ email });

  return res.status(200).json({ data: res2 });
});
app.post("/deleteCartProduct", async (req, res) => {
  const id = req.body.item._id;
  const res2 = await carts.remove({ _id: id });
  console.log(res2);
  return res.status(200).json({ data: res2 });
});
app.post("/getCartTotal", async (req, res) => {
  const email = req.body.cemail;
  const res2 = await carts.find({ email });
  let price = 0;
  for (let i = 0; i < res2.length; i++) {
    price = price + res2[i].discount * res2[i].quantity;
  }

  return res.status(200).json({ data: price });
});
app.post("/placeorder", async (req, res) => {
  for (let i = 0; i < req.body.data.length; i++) {
    const placeorder = new orders({
      productName: req.body.data[i].productName,
      price: req.body.data[i].price,
      productDescription: req.body.data[i].productDescription,
      category: req.body.data[i].category,
      photo: req.body.data[i].photo,
      discount: req.body.data[i].discount,
      email: req.body.data[i].email,
      quantity: req.body.data[i].quantity,
      remail: req.body.data[i].remail,
    });
    placeorder
      .save()
      .then((result) => {
        res.status(200).json({
          success: true,
          message: "product added successfully",
          createdPRoduct: result,
        });
      })
      .catch((err) => {
        res.status(err.status || 500).json({ error: { message: err.message } });
      });
  }
});
app.post("/getOrderProduct", async (req, res) => {
  const email = req.body.lemail;

  const res2 = await orders.find({ remail: email });

  return res.status(200).json({ data: res2 });
});
app.post("/getyourorder", async (req, res) => {
  const email = req.body.cemail;

  const res2 = await orders.find({ email: email });

  return res.status(200).json({ data: res2 });
});
app.listen(8000);
