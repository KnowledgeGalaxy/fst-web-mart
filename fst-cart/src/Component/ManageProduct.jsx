import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root'); // Set the root element for accessibility

const ProductManager = () => {
  const [products, setProducts] = useState([]);
  const [isDeleted, setIsDeleted] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Fetch products from your API
    fetch('https://fst-cart-production.up.railway.app/api/products/')
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error('Error fetching products:', error));
  }, [isDeleted]);

  const handleEdit = (product) => {
    // Set the selected product for editing
    setSelectedProduct(product);
    // Open the modal
    setIsModalOpen(true);
  };

  const handleDelete = (productId) => {
    // Add code to handle deleting a product
    const id = parseInt(productId);
    fetch(`https://fst-cart-production.up.railway.app/api/products/${id}/`, {
      method: 'DELETE',
    })
      .then(response => {
        if (response.ok) {
          setIsDeleted(true);
        }
      });
  };

  const handleCloseModal = () => {
    // Close the modal
    setIsModalOpen(false);
    // Reset the selected product
    setSelectedProduct(null);
  };

  const handleSaveChanges = async () => {
    try {
      const response = await fetch(`https://fst-cart-production.up.railway.app/api/products/${selectedProduct.id}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: selectedProduct.name,
          price: parseFloat(selectedProduct.price), // Assuming price is a number
          category: selectedProduct.category, // Assuming category is a valid category ID
          description: selectedProduct.description,
          imageUrl: selectedProduct.imageUrl,
        }),
      });
  
      if (response.ok) {
        console.log(`Product with ID ${selectedProduct.id} updated successfully`);
        setIsModalOpen(false); // Close the modal
        setSelectedProduct(null); // Reset the selected product
        setIsDeleted(true); // Refresh the product list by triggering isDeleted
      } else {
        console.error('Failed to update product:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

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
                <button onClick={() => handleEdit(product)}>Edit</button>
                <button onClick={() => handleDelete(product.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal
  isOpen={isModalOpen}
  onRequestClose={handleCloseModal}
  contentLabel="Edit Product Modal"
  style={{
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  }}
>
  <h2>Edit Product</h2>
  {/* Render the form with fields for editing, e.g., input fields */}
  <div>
    <label>Name:</label>
    <input
      type="text"
      value={selectedProduct ? selectedProduct.name : ''}
      onChange={(e) => setSelectedProduct({ ...selectedProduct, name: e.target.value })}
    />
  </div>
  <div>
    <label>Price:</label>
    <input
      type="number"
      value={selectedProduct ? selectedProduct.price : ''}
      onChange={(e) => setSelectedProduct({ ...selectedProduct, price: e.target.value })}
    />
  </div>
  <div>
    <label>Category:</label>
    <input
      type="number"
      value={selectedProduct ? selectedProduct.category : ''}
      onChange={(e) => setSelectedProduct({ ...selectedProduct, category: e.target.value })}
    />
  </div>
  <div>
    <label>Description:</label>
    <textarea
      value={selectedProduct ? selectedProduct.description : ''}
      onChange={(e) => setSelectedProduct({ ...selectedProduct, description: e.target.value })}
    />
  </div>
  <div>
    <label>Image URL:</label>
    <input
      type="url"
      value={selectedProduct ? selectedProduct.imageUrl : ''}
      onChange={(e) => setSelectedProduct({ ...selectedProduct, imageUrl: e.target.value })}
    />
  </div>
  {/* Add more fields as needed */}
  <button onClick={handleCloseModal}>Close</button>
  <button onClick={handleSaveChanges}>Save Changes</button>
</Modal>
    </div>
  );
}

export default ProductManager;
