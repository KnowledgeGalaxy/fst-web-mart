import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/Category.css';
import { Link } from 'react-router-dom';
const Category = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState('');

  useEffect(() => {
    axios.get('https://fst-cart-production.up.railway.app/api/categories/')
      .then(response => {
        setCategories(response.data);
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
      });
  }, []);

  const handleAddCategory = () => {
    axios.post('https://fst-cart-production.up.railway.app/api/categories/', {
      name: newCategory
    })
      .then(response => {
        setCategories([...categories, response.data]);
        setNewCategory('');
      })
      .catch(error => {
        console.error('Error adding category:', error);
      });
  };

  const handleEditCategory = (id, newName) => {
    axios.put(`https://fst-cart-production.up.railway.app/api/categories/${id}/`, {
      name: newName
    })
      .then(response => {
        setCategories(categories.map(category => 
          category.id === id ? { ...category, name: newName } : category
        ));
      })
      .catch(error => {
        console.error('Error updating category:', error);
      });
  };

  const handleDeleteCategory = (id) => {
    axios.delete(`https://fst-cart-production.up.railway.app/api/categories/${id}/`)
      .then(response => {
        setCategories(categories.filter(category => category.id !== id));
      })
      .catch(error => {
        console.error('Error deleting category:', error);
      });
  };

  return (
    <div className="category-management-container">
      <div>
      <Link to="/admin">
        <button type="button">Back</button>
      </Link>
    </div>
      <h1>Category Management</h1>
      <div className="input-group">
        <input
          type="text"
          placeholder="New Category"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          className="category-input"
        />
        <button onClick={handleAddCategory} className="category-button">Add Category</button>
      </div>
      <ul className="category-list">
        {categories.map(category => (
          <li key={category.id} className="category-list-item">
            {category.name}
            <button onClick={() => handleEditCategory(category.id, prompt('Enter new name:', category.name))} className="edit-button">Edit</button>
            <button onClick={() => handleDeleteCategory(category.id)} className="delete-button">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Category;
