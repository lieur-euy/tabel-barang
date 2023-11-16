"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const customer_1 = __importDefault(require("./customer"));
const product_1 = __importDefault(require("./product"));
const transaksi_1 = __importDefault(require("./transaksi"));
const router = express_1.default.Router();
router.get('/', (req, res) => {
    res.json({
        message: 'ADA DI /API',
    });
});
router.use('/customer', customer_1.default);
router.use('/product', product_1.default);
router.use('/transaksi', transaksi_1.default);
exports.default = router;
