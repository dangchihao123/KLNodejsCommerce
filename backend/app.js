const express = require('express');
const app = express();
const paypal = require('paypal-rest-sdk');
// const data = require('./data');
const cors = require('cors');
const database = require('./config/database');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const http = require('http');
const dataTinh = require('./dataTinh.json');
const { Server } = require('socket.io');
const path = require('path');
// const __dirname = path.resolve();


app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
})

// app.get('/api/tinh', (req, res) => {
//   res.json(dataTinh);
// });

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

require('dotenv').config();
dotenv.config();
const mongodbUrl = database.MONGODB_URL;
mongoose.connect(mongodbUrl, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true
}).catch(error => console.log(error.reason));



// use it before all route definitions
app.use(cors({ origin: 'http://localhost:3000' }));

const userRoute = require('./routes/userRouter');
const productRouter = require('./routes/productRouter');
const orderRouter = require('./routes/orderRouter');
const categoryRouter = require('./routes/categoriesRouter');
const uploadRouter = require('./routes/uploadRouter.js');
const tinhRouter = require('./routes/tinhRouter');

app.use('/api/tinh', tinhRouter);
app.use('/api/uploads', uploadRouter);
app.use('/api/categories', categoryRouter);
app.use('/api/products', productRouter);
app.use('/api/users', userRoute);
app.use('/api/orders', orderRouter);
app.get('/api/config/paypal', (req, res) => {
  res.send(database.PAYPAL_CLIENT_ID || 'sb');
})

app.use('/uploads', express.static(path.join(__dirname, '/uploads')));
app.use(express.json());
app.set('view engine', 'ejs');
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

//import router
// const userRouter = require('./api/user/user.router');
// const unitRouter = require('./api/unit/unit.router');
// const branchRouter = require('./api/branch/branch.router');
// const categoryRouter = require('./api/category/category.router');
// const brandRouter = require('./api/brand/brand.router');
// const productRouter = require('./api/products/product.router');
// const tagRouter = require('./api/tag/tag.router');
// const discountRouter = require('./api/discount/discount.router');
// const supplierRouter = require('./api/supplier/supplier.router');
const { Socket } = require('dgram');
// const paypal = require('./api/paypel/paypal.router');

// app.use('/api/user', userRouter);
// app.use('/api/unit', unitRouter);
// app.use('/api/branch', branchRouter);
// app.use('/api/category', categoryRouter);
// app.use('/api/brand', brandRouter);
// app.use('/api/product', productRouter);
// app.use('/api/tag', tagRouter);
// app.use('/api/discount', discountRouter);
// app.use('/api/supplier', supplierRouter);
// app.use('/pay', paypal);

paypal.configure({
  'mode': 'sandbox', //sandbox or live
  'client_id': 'ASMl7FI7k3BanvanfgCddbLq2CaPNyn9cz63bo6dkI0wkH30EpM-mU0desACXW6QXZTPQ6cmHHFw7cBK',
  'client_secret': 'EJ1onl3mokr-08Ka8rFiRyeN4PIINIfehms066QwIXWisO9ppHl4rvgLgOUKAEW4WkEGWWsNhZdeh6kw'
});
app.get('/', (req, res) => {
  res.render('index');
})
app.get('/pay', (req, res) => {
  var create_payment_json = {
    "intent": "sale",
    "payer": {
      "payment_method": "paypal"
    },
    "redirect_urls": {
      "return_url": "http://localhost:3000/success",
      "cancel_url": "http://localhost:3000/cancel"
    },
    "transactions": [{
      "item_list": {
        "items": [{
          "name": "Red Sox Hat",
          "sku": "001",
          "price": "25",
          "currency": "USD",
          "quantity": 1
        }]
      },
      "amount": {
        "currency": "USD",
        "total": "25.00"
      },
      "description": "This is hat beutiful"
    }]
  };
  paypal.payment.create(create_payment_json, function (error, payment) {
    if (error) {
      throw error;
    } else {
      for (let i = 0; i < payment.links.length; i++) {
        if (payment.links[i].rel === 'approval_url') {
          res.redirect(payment.links[i].href)
        }
      }
    }
  });
})

app.get('/', (req, res) => {
  const payerId = req.query.payerId;
  const paymentId = req.query.paymentId;
  var execute_payment_json = {
    "payer_id": "Appended to redirect url",
    "transactions": [{
      "amount": {
        "currency": "USD",
        "total": "25.00"
      }
    }]
  };
  paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
    if (error) {
      console.log(error.response);
      throw error;
    } else {
      console.log(JSON.stringify(payment));
      res.send('success');
    }
  });
})
// app.get('/cancel', (req, res) => {
//     res.send('cancel');
// })

// const httpServer = http.Server(app);
// const io = SocketIO(httpServer);
const port = process.env.PORT || 3001;
const httpServer = http.Server(app);
const io = new Server(httpServer, { cors: { origin: '*' } });
const users = [];

io.on('connection', (socket) => {
  console.log('connection', socket.id);
  socket.on('disconnect', () => {
    const user = users.find((x) => x.socketId === socket.id);
    if (user) {
      user.online = false;
      console.log('Offline', user.name);
      const admin = users.find((x) => x.isAdmin && x.online);
      if (admin) {
        io.to(admin.socketId).emit('updateUser', user);
      }
    }
  });
  socket.on('onLogin', (user) => {
    const updatedUser = {
      ...user,
      online: true,
      socketId: socket.id,
      messages: [],
    };
    const existUser = users.find((x) => x._id === updatedUser._id);
    if (existUser) {
      existUser.socketId = socket.id;
      existUser.online = true;
    } else {
      users.push(updatedUser);
    }
    console.log('Online', user.name);
    const admin = users.find((x) => x.isAdmin && x.online);
    if (admin) {
      io.to(admin.socketId).emit('updateUser', updatedUser);
    }
    if (updatedUser.isAdmin) {
      io.to(updatedUser.socketId).emit('listUsers', users);
    }
  });

  socket.on('onUserSelected', (user) => {
    const admin = users.find((x) => x.isAdmin && x.online);
    if (admin) {
      const existUser = users.find((x) => x._id === user._id);
      io.to(admin.socketId).emit('selectUser', existUser);
    }
  });

  socket.on('onMessage', (message) => {
    if (message.isAdmin) {
      const user = users.find((x) => x._id === message._id && x.online);
      if (user) {
        io.to(user.socketId).emit('message', message);
        user.messages.push(message);
      }
    } else {
      const admin = users.find((x) => x.isAdmin && x.online);
      if (admin) {
        io.to(admin.socketId).emit('message', message);
        const user = users.find((x) => x._id === message._id && x.online);
        user.messages.push(message);
      } else {
        io.to(socket.id).emit('message', {
          name: 'Admin',
          body: 'Sorry. I am not online right now',
        });
      }
    }
  });
});

httpServer.listen(port, () => {
  console.log(`Serve at http://localhost:${port}`);
});