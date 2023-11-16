import express from 'express';
import { PrismaClient, customer } from '@prisma/client';
import bcrypt from 'bcrypt';
const prisma = new PrismaClient();
const router = express.Router();

interface CustomerResponse extends Array<customer> { }

router.get<{}, CustomerResponse>('/', async (req, res) => {
    try {
      const customer = await prisma.customer.findMany();
      res.json(customer);
    } catch (error) {
      console.log(error);
    } finally {
      prisma.$disconnect();
    }
  });
  router.get<{ id: any }>('/:id', async (req, res) => {
    const customerId = req.params.id;
    try {
      const getById = await prisma.customer.findUnique({
        where: { id: parseInt(customerId)  },
  
      });
      res.json(getById);
  
    } catch (error) {
      console.log(error);
    } finally {
      prisma.$disconnect();
    }
  });
  router.post<{}, customer>('/', async (req, res) => {
    const newcustomerData: customer = req.body;
  
    try {
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(newcustomerData.password, saltRounds);
      const newCustomer = await prisma.customer.create({
        data: {
          ...newcustomerData,
          password: hashedPassword,
        },
      });
      res.json(newCustomer);
    } catch (error) {
      console.log(error);
    } finally {
      prisma.$disconnect();
    }
  });

  router.put<{ id: any }, customer>('/:id', async (req, res) => {
    const customerId = req.params.id;
    const updatedcustomerData: customer = req.body;
    try {
      const updatedcustomer = await prisma.customer.update({
        where: { id: parseInt(customerId) },
        data: updatedcustomerData,
      });
      res.json(updatedcustomer);
    } catch (error) {
      console.log(error);
    } finally {
      prisma.$disconnect();
    }
  });
  
  router.delete<{ id: any }>('/:id', async (req, res) => {
    const customerId = req.params.id;
    
    try {
      const deletedcustomer = await prisma.customer.delete({
        where: { id: parseInt(customerId) },
      });
      res.json( deletedcustomer);
    } catch (error) {
      console.log(error);
  
    } finally {
      prisma.$disconnect();
    }
  });
  
export default router;
