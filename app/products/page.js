"use client";

import { useEffect,useRef, useState } from "react";
import { getProducts , getProductsBySearch, getCategories,getProductsByCategory} from "@/services/productService";
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
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const debouncedSearch = useDebounce(search);
    const requestId = useRef(0);
    const skip = (currentPage - 1) * pageSize;
    const totalPages = Math.ceil(totalProducts / pageSize);

  useEffect(() => {
    async function loadProducts() {
      const currentRequestId = ++requestId.current;
      let data;

      if (debouncedSearch !== "") {
        data = await getProductsBySearch(debouncedSearch);
      } else if (selectedCategory !== "") {
        data = await getProductsByCategory(selectedCategory);
      } else {
        data = await getProducts(pageSize, skip);
      }

      if (currentRequestId !== requestId.current) {
        return;
      }

      setProducts(data.products);
      setTotalProducts(data.total)
    }

    loadProducts();
  }, [currentPage, pageSize, debouncedSearch,selectedCategory]);

  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearch, selectedCategory]);

  useEffect(() => {
    async function loadCategories(){
      console.log("loadCategories started");
      const categories = await getCategories();
      console.log(categories);
      setCategories(categories);
    }

    loadCategories();
  }, []);

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

        <select onChange={(e) => {console.log("Selected category:", e.target.value);
          setSelectedCategory(e.target.value)}}>
          <option value="">All Categories</option>

          {categories.map((category) => (
            <option key={category.slug} value={category.slug}>
              {category.name}
            </option>
          ))}
        </select>
        
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