import express from 'express';

import Login from './login';
import Register from './register';
import { PrismaClient, customer } from '@prisma/client';
const prisma = new PrismaClient();
const router = express.Router();

interface CustomerResponse extends Array<customer> { }



router.get<{}, CustomerResponse>('/user', async (req, res) => {
    try {
        const customer = await prisma.customer.findMany();
        res.json(customer);
    } catch (error) {
        console.log(error);
    } finally {
        prisma.$disconnect();
    }
});

router.use('/login', Login);
router.use('/register', Register);

export default router;
