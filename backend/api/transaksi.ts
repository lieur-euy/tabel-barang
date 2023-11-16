import express from 'express';
import { PrismaClient, transaksi } from '@prisma/client';
import { AnyMxRecord } from 'dns';

const prisma = new PrismaClient();
const router = express.Router();

interface transaksiResponse extends Array<transaksi> { }

router.get<{}, transaksiResponse>('/', async (req, res) => {
    try {
      const transaksi = await prisma.transaksi.findMany();
  
      res.json(transaksi);
    } catch (error) {
      console.log(error);
    } finally {
      prisma.$disconnect();
    }
  
  });
  //Get transaksi By Id
router.get<{ id: any }>('/:id', async (req, res) => {
  const transaksiId = req.params.id;
  try {
    const getById = await prisma.transaksi.findUnique({
      where: { id: parseInt(transaksiId) },

    });
    res.json(getById);

  } catch (error) {
    console.log(error);
  } finally {
    prisma.$disconnect();
  }
});

router.post<{}, transaksi>('/', async (req, res) => {
  const newtransaksi: transaksi = req.body;

  try {
    const data = await prisma.transaksi.create({
      data: newtransaksi,
    });
    res.json(data);
  } catch (error) {
    console.log(error);
  } finally {
    prisma.$disconnect();
  }
});

router.put<{ id: any }, transaksi>('/:id', async (req, res) => {
  const transaksiId = req.params.id;
  const updatedtransaksiData: transaksi = req.body;
  try {
    const updatedtransaksi = await prisma.transaksi.update({
      where: { id: parseInt(transaksiId) },
      data: updatedtransaksiData,
    });
    res.json(updatedtransaksi);
  } catch (error) {
    console.log(error);
  } finally {
    prisma.$disconnect();
  }
});

router.delete<{ id: any }, transaksi>('/:id', async (req, res) => {
  const transaksiId = req.params.id;
  try {
    const deletedtransaksi = await prisma.transaksi.delete({
      where: { id: parseInt(transaksiId) },
    });
    res.json(deletedtransaksi);
  } catch (error) {
    console.log(error);

  } finally {
    prisma.$disconnect();
  }
});
export default router;
