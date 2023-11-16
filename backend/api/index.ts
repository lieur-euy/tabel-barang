import express from 'express';

import customer from './customer';
import prpduct from './product';
import transaksi from './transaksi';

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'ADA DI /API',
  });
});

router.use('/customer', customer);
router.use('/product', prpduct);
router.use('/transaksi', transaksi);

export default router;
