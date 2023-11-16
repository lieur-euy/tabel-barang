import express from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const router = express.Router();


router.get<{}>('/laporan', async (req, res) => {
    try {
      const datalaporan = await prisma.transaksi.findMany({
        include: {
          customer_details: true,
          product_details: true,
        },
      });
      res.json(datalaporan);
    } catch (error) {
      console.log(error);
    } finally {
      prisma.$disconnect();
    }
  });

  
export default router;
