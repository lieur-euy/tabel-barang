import Image from 'next/image'
import { GetAllTabelCustomer, GetAllTabelProduct, GetAllTabeltransaksi } from './api'
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/components/ui/table'
export default async function Home() {
  const a = await GetAllTabeltransaksi()
  const customerdata = await GetAllTabelCustomer()
  const productdata = await GetAllTabelProduct()

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className='w-full border-2 p-2 m-2'>
        <h1>Tabel Customer</h1>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nama</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {customerdata.map((invoice: any) => (
              <TableRow key={invoice.id}>
                 <TableCell >{invoice.name}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className='w-full border-2 p-2 m-2'>
        <h1>Tabel Produk</h1>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>prdnm</TableHead>
              <TableHead>Harga</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {productdata.map((invoice: any) => (
              <TableRow key={invoice.id}>
                 <TableCell >{invoice.prdnm}</TableCell>
                 <TableCell >Rp. {invoice.harga}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className='w-full border-2 p-2 m-2'>
        <h1>Tabel Transaksi</h1>
        <Table>
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">invoice_number</TableHead>
              <TableHead>invoice_date</TableHead>
              <TableHead>qty</TableHead>
              <TableHead>total_amount</TableHead>
              <TableHead>total_count</TableHead>
              <TableHead>product_id</TableHead>
              <TableHead>customer_id</TableHead>

            </TableRow>
          </TableHeader>
          <TableBody>
            {a.map((invoice: any) => (
              <TableRow key={invoice.invoice_number}>
                 <TableCell >{invoice.invoice_number}</TableCell>
                <TableCell >{invoice.invoice_date}</TableCell>
                <TableCell>{invoice.qty}</TableCell>
                <TableCell>{invoice.total_amount}</TableCell>
                <TableCell className="">{invoice.total_count}</TableCell>
                <TableCell className="">{invoice.product_id}</TableCell>
                <TableCell className="">{invoice.customer_id}</TableCell>
              </TableRow>
            ))}
          </TableBody>

        </Table>
      </div>
      <div className='w-full border-2 p-2 m-2'>
        <h1>Tabel Laporan Transaksi</h1>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>prdnm</TableHead>
              <TableHead>Harga</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {productdata.map((invoice: any) => (
              <TableRow key={invoice.id}>
                 <TableCell >{invoice.prdnm}</TableCell>
                 <TableCell >Rp. {invoice.harga}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </main>
  )
}
