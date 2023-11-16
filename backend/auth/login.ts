
import express from 'express';
import { PrismaClient, customer } from '@prisma/client';
import bcrypt from 'bcrypt';
const prisma = new PrismaClient();
const router = express.Router();


router.post<{}>('/', async (req, res) => {
    const newcustomerData: customer = req.body;

    try {
        const existingCustomer = await prisma.customer.findUnique({
            where:
            {
                username: newcustomerData.username as string
            }
        });

        if (!existingCustomer) {
            return res.status(404).json();
        }

        const passwordMatch = await bcrypt.compare(newcustomerData.password, existingCustomer.password);

        if (!passwordMatch) {
            return res.status(401).json();
        }

        // Jika autentikasi berhasil
        res.json({message: "Berhasil Login", name: existingCustomer.name});
    } catch (error) {

        res.status(500).json();
    } finally {
        prisma.$disconnect();
    }
});

export default router;
