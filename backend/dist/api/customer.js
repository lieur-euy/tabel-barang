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
const bcrypt_1 = __importDefault(require("bcrypt"));
const prisma = new client_1.PrismaClient();
const router = express_1.default.Router();
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const customer = yield prisma.customer.findMany();
        res.json(customer);
    }
    catch (error) {
        console.log(error);
    }
    finally {
        prisma.$disconnect();
    }
}));
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const customerId = req.params.id;
    try {
        const getById = yield prisma.customer.findUnique({
            where: { id: parseInt(customerId) },
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
    const newcustomerData = req.body;
    try {
        const saltRounds = 10;
        const hashedPassword = yield bcrypt_1.default.hash(newcustomerData.password, saltRounds);
        const newCustomer = yield prisma.customer.create({
            data: Object.assign(Object.assign({}, newcustomerData), { password: hashedPassword }),
        });
        res.json(newCustomer);
    }
    catch (error) {
        console.log(error);
    }
    finally {
        prisma.$disconnect();
    }
}));
router.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const customerId = req.params.id;
    const updatedcustomerData = req.body;
    try {
        const updatedcustomer = yield prisma.customer.update({
            where: { id: parseInt(customerId) },
            data: updatedcustomerData,
        });
        res.json(updatedcustomer);
    }
    catch (error) {
        console.log(error);
    }
    finally {
        prisma.$disconnect();
    }
}));
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const customerId = req.params.id;
    try {
        const deletedcustomer = yield prisma.customer.delete({
            where: { id: parseInt(customerId) },
        });
        res.json(deletedcustomer);
    }
    catch (error) {
        console.log(error);
    }
    finally {
        prisma.$disconnect();
    }
}));
exports.default = router;
