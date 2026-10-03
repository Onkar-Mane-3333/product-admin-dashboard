"use client";

import { useEffect, useState } from "react";
import { getProducts } from "@/services/productService";
import ProductTable from "@/components/ProductTable";
import ProductCard from "@/components/ProductCard";
import Pagination from "@/components/Pagination";

export default function ProductsPage() {
    const [products,setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalProducts, setTotalProducts] = useState(0);
    const skip = (currentPage - 1) * pageSize;
    const totalPages = Math.ceil(totalProducts / pageSize);

  useEffect(() => {
    async function loadProducts() {
      const data = await getProducts(pageSize,skip);
      console.log("API total:", data.total);

      setProducts(data.products);
      setTotalProducts(data.total)
    }

    loadProducts();
  }, [currentPage, pageSize]);

        console.log("Total products:", totalProducts);
        console.log("Page size:", pageSize);
        console.log("Total pages:", totalPages);
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
        <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages = {totalPages} pageSize={pageSize} setPageSize={setPageSize} totalProducts={totalProducts}/>
        </>
    </div>
  )
}