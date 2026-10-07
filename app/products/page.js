"use client";

import { useEffect,useRef, useState } from "react";
import { getProducts , getProductsBySearch} from "@/services/productService";
import ProductTable from "@/components/ProductTable";
import ProductCard from "@/components/ProductCard";
import Pagination from "@/components/Pagination";
import SearchBar from "@/components/SearchBar";
import useDebounce from "@/hooks/useDebounce";


export default function ProductsPage() {
    const [products,setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalProducts, setTotalProducts] = useState(0);
    const [search , setSearch] = useState("");
    const debouncedSearch = useDebounce(search);
    const requestId = useRef(0);
    const skip = (currentPage - 1) * pageSize;
    const totalPages = Math.ceil(totalProducts / pageSize);

  useEffect(() => {
    async function loadProducts() {
      const currentRequestId = ++requestId.current;
      let data;

      if (debouncedSearch === "") {
        data = await getProducts(pageSize, skip);
      } else {
        data = await getProductsBySearch(debouncedSearch);
      }

      if (currentRequestId !== requestId.current) {
        return;
      }

      setProducts(data.products);
      setTotalProducts(data.total)
    }

    loadProducts();
  }, [currentPage, pageSize, debouncedSearch]);

  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearch]);

        console.log("Total products:", totalProducts);
        console.log("Page size:", pageSize);
        console.log("Total pages:", totalPages);
        console.log(search);
        console.log("search:", search);
console.log("debouncedSearch:", debouncedSearch);
  return(
    <div>
        <h1>Products</h1>
        <SearchBar setSearch = {setSearch}/>
        
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