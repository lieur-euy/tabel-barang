import express from 'express';
import { PrismaClient, product } from '@prisma/client';

const prisma = new PrismaClient();
const router = express.Router();

interface ProductResponse extends Array<product> { }

router.get<{}, ProductResponse>('/', async (req, res) => {
  try {
    const product = await prisma.product.findMany();
    res.json(product);
  } catch (error) {
    console.log(error);
  } finally {
    prisma.$disconnect();
  }

});
//Get product By Id
router.get<{ id: number }>('/:id', async (req, res) => {
  const ProductId = req.params.id;
  try {
    const getById = await prisma.product.findUnique({
      where: { id: ProductId },

    });
    res.json(getById);

  } catch (error) {
    console.log(error);
  } finally {
    prisma.$disconnect();
  }
});

router.post<{}, product>('/', async (req, res) => {
  const newproduct: product = req.body;

  try {
    const data = await prisma.product.create({
      data: newproduct,

    });
    res.json(data);
  } catch (error) {
    console.log(error);
  } finally {
    prisma.$disconnect();
  }
});

router.put<{ id: number }, product>('/:id', async (req, res) => {
  const ProductId = req.params.id;
  const updatedProductData: product = req.body;
  try {
    const updatedProduct = await prisma.product.update({
      where: { id: ProductId },
      data: updatedProductData,
    });
    res.json(updatedProduct);
  } catch (error) {
    console.log(error);
  } finally {
    prisma.$disconnect();
  }
});

router.delete<{ id: number }, product>('/:id', async (req, res) => {
  const ProductId = req.params.id;
  try {
    const deletedproduct = await prisma.product.delete({
      where: { id: ProductId },
    });
    res.json(deletedproduct);
  } catch (error) {
    console.log(error);

  } finally {
    prisma.$disconnect();
  }
});
export default router;
