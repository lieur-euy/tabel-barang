import express from 'express';
import { PrismaClient, customer } from '@prisma/client';
import bcrypt from 'bcrypt';
const prisma = new PrismaClient();
const router = express.Router();

  router.post<{}, customer>('/', async (req, res) => {
    const newcustomerData: customer = req.body;
  
    try {
        const existingCustomer = await prisma.customer.findUnique({
            where:
            {
                username: newcustomerData.username as string
            }
        });
    
        if (!existingCustomer) {
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(newcustomerData.password, saltRounds);
            const newCustomer = await prisma.customer.create({
              data: {
                ...newcustomerData,
                password: hashedPassword,
              },
            });
            res.json(newCustomer);
        }else { 
            res.status(400).json();
        }

    } catch (error) {
      console.log(error);
    } finally {
      prisma.$disconnect();
    }
  });
  
export default router;
