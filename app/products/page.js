"use client";

import { useEffect, useState } from "react";
import { getProducts } from "@/services/productService";
import ProductTable from "@/components/ProductTable";
import ProductCard from "@/components/ProductCard";

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
        <>
        <div className="hidden md:block">
            <ProductTable products={products} />
        </div>

        <div className="grid gap-4 px-2 md:hidden">
            {products.map((product) => (
            <ProductCard
                key={product.id}
                product={product}
            />
            ))}
        </div>
        </>
    </div>
  )
}