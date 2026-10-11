"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getProductById } from "@/services/productService";
import Link from "next/link";

export default function ProductDetailsPage({ params }) {
  const { id } = useParams();

  // const product = await getProductById(id);
  // console.log("Product details:", product);

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
  async function fetchProduct() {
    try {
      const data = await getProductById(id);
      console.log("Reviews:", data.reviews);
      setProduct(data);
    } catch (error) {
      console.error("Failed to fetch product:", error);
      setError("Failed to fetch product. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  fetchProduct();
}, [id]);

  return (
    <div>
      <Link href="/products">← Back to Products</Link>
    {loading ? (
      <p>Loading product...</p>
    ) : error ? (
      <p>{error}</p>
    ): product ? (
      <div>
        <h1>{product.title}</h1>
        <img src={product.images[0]} alt={product.title} />
        <p>{product.description}</p>
        <p>Price: ${product.price}</p>
        <p>Rating: {product.rating} / 5</p>
        <h2>Customer Reviews</h2>

        {product.reviews?.length > 0 ? (
          product.reviews.map((review, index) => (
            <div key={index}>
              {review.rating != null && <p>Rating: {review.rating} / 5</p>}
              {review.comment && <p>Comment: {review.comment}</p>}
              {review.reviewerName && <p>Reviewer: {review.reviewerName}</p>}
            </div>
          ))
        ) : (
          <p>No reviews available.</p>
        )}
      </div>
    ) : (
      <p>Product not found.</p>
    )}
  </div>
  );
}