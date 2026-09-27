export default function ProductCard({ product }) {
  return (
    <div className="border rounded-lg p-4">
      <img
        src={product.images[0]}
        alt={product.title}
        className="w-full h-48 object-contain"
      />

      <h2 className="font-semibold mt-3">{product.title}</h2>

      <p>Category: {product.category}</p>
      <p>Price: ${product.price}</p>
      <p>Rating: {product.rating}</p>
      <p>Stock: {product.stock}</p>
    </div>
  );
}