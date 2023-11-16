"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const router = express_1.default.Router();
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield prisma.product.findMany();
        res.json(product);
    }
    catch (error) {
        console.log(error);
    }
    finally {
        prisma.$disconnect();
    }
}));
//Get product By Id
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const ProductId = req.params.id;
    try {
        const getById = yield prisma.product.findUnique({
            where: { id: ProductId },
        });
        res.json(getById);
    }
    catch (error) {
        console.log(error);
    }
    finally {
        prisma.$disconnect();
    }
}));
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newproduct = req.body;
    try {
        const data = yield prisma.product.create({
            data: newproduct,
        });
        res.json(data);
    }
    catch (error) {
        console.log(error);
    }
    finally {
        prisma.$disconnect();
    }
}));
router.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const ProductId = req.params.id;
    const updatedProductData = req.body;
    try {
        const updatedProduct = yield prisma.product.update({
            where: { id: ProductId },
            data: updatedProductData,
        });
        res.json(updatedProduct);
    }
    catch (error) {
        console.log(error);
    }
    finally {
        prisma.$disconnect();
    }
}));
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const ProductId = req.params.id;
    try {
        const deletedproduct = yield prisma.product.delete({
            where: { id: ProductId },
        });
        res.json(deletedproduct);
    }
    catch (error) {
        console.log(error);
    }
    finally {
        prisma.$disconnect();
    }
}));
exports.default = router;
