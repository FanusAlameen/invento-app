import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import authRouter from './src/routes/authRoute.js';
import userRouter from './src/routes/userRoute.js';
import clientRouter from './src/routes/clientRoute.js';
import supplierRouter from './src/routes/supplierRoute.js';
import productRouter from './src/routes/productRoute.js';
import purchaseRouter from './src/routes/purchaseRoute.js';
import saleRouter from './src/routes/saleRoute.js';
import inventoryRouter from './src/routes/inventoryRoute.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use(express.json());
app.use(cors());

app.use('/auth', authRouter);
app.use('/api', userRouter);
app.use('/api', clientRouter);
app.use('/api', supplierRouter);
app.use('/api', productRouter);
app.use("/api", purchaseRouter);
app.use("/api", saleRouter);
app.use("/api", inventoryRouter);

app.get("/", (req, res) => {
    res.json("Hello this is invento's backend!!!");
});

app.listen(PORT, () => {
    console.log(`Connected to Invento Backend ${PORT}`);
});
