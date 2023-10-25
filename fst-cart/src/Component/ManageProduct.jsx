import React, { useState, useEffect } from 'react';

const ProductManager = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch products from your API
    fetch('https://fst-cart-production.up.railway.app/api/products/')
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  const handleEdit = (productId) => {
    // Add code to handle editing a product
    // For example, you can redirect to a product edit page
    console.log(`Editing product with ID ${productId}`);
  }

  const handleDelete = (productId) => {
    // Add code to handle deleting a product
    const id=parseInt(productId);
    fetch(`https://fst-cart-production.up.railway.app/api/products/${id}/`, {
      method: 'DELETE',
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json(); // You may not need this depending on your API
    })
    .then(data => {
      // Update state or perform any other actions after successful deletion
      console.log(`Product with ID ${productId} deleted successfully`);
      // You may want to update the products state to remove the deleted product
      setProducts(prevProducts => prevProducts.filter(product => product.id !== productId));
    })
    .catch(error => console.error('Error deleting product:', error));
  }

  return (
    <div>
      <h1>Product Manager</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>
                <button onClick={() => handleEdit(product.id)}>Edit</button>
                <button onClick={() => handleDelete(product.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductManager;
