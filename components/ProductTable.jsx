export default function ProductTable({ products }) {
  return (
    <table className="w-full border-collapse">
      <thead>
        <tr>
          <th className="border p-3 text-left">Image</th>
          <th className="border p-3 text-left">Title</th>
          <th className="border p-3 text-left">Category</th>
          <th className="border p-3 text-left">Price</th>
          <th className="border p-3 text-left">Rating</th>
          <th className="border p-3 text-left">Stock</th>
        </tr>
      </thead>

      <tbody>
        {products.map((product) => (
          <tr key={product.id}>
            <td className="border p-3">
              <img
                src={product.images[0]}
                alt={product.title}
                width="80"
              />
            </td>

            <td className="border p-3">{product.title}</td>
            <td className="border p-3">{product.category}</td>
            <td className="border p-3">${product.price}</td>
            <td className="border p-3">{product.rating}</td>
            <td className="border p-3">{product.stock}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}