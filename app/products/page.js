"use client";

import { useEffect, useState } from "react";
import { getProducts } from "@/services/productService";

export default function ProductsPage() {
    const [products,setProducts] = useState([]);

  useEffect(() => {
    async function loadProducts() {
      const data = await getProducts();

      setProducts(data.products);
    }

    loadProducts();
  }, []);

  return(
    <div>
        <h1>Products</h1>

        {products.map((product) => (
            <div key={product.id}>
                <h2>{product.title}</h2>
                <p>Price: ${product.price}</p>
            </div>
        ))}
    </div>
  )
}