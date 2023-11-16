export async function GetAllTabeltransaksi() {
    const res = await fetch('http://localhost:3000/api/v1/transaksi');
    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error('Failed to fetch data')
    }
    return res.json()
  }

  export async function GetAllTabelCustomer() {
    const res = await fetch('http://localhost:3000/api/v1/customer');
    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error('Failed to fetch data')
    }
    return res.json()
  }

  export async function GetAllTabelProduct() {
    const res = await fetch('http://localhost:3000/api/v1/product');
    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error('Failed to fetch data')
    }
    return res.json()
  }
