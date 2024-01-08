import React, { useState } from 'react';

const Form = () => {
    const [data, setData] = useState({ name: '', age: '', address: '', photo: '' });

    const handleChange = (e) => {
      const name = e.target.name;
      const value = e.target.value;
      setData({ ...data, [name]: value });
    };
  
    const handleFileChange = (e) => {
      const name = e.target.name;
      const file = e.target.files[0];
  
      const reader = new FileReader();
      reader.onloadend = () => {
        setData({ ...data, [name]: reader.result });
      };
  
      if (file) {
        reader.readAsDataURL(file);
      }
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      try {
        const response = await fetch('http://localhost:8500/pdf/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
  
        if (response.ok) {
          // Handle successful form submission, e.g., show a success message
          console.log('Form submitted successfully!');
        } else {
          // Handle errors, e.g., show an error message
          console.error('Form submission failed.');
        }
      } catch (error) {
        // Handle network errors or other issues
        console.error('Error during form submission:', error);
      }
    };
  

  return (
    <form method="post" onSubmit={handleSubmit}>
      <h1>Enter Your Details</h1>
      <input type="text" name="name" onChange={handleChange} value={data.name} placeholder="Name" />
      <input type="number" name="age" onChange={handleChange} value={data.age} placeholder="Age" />
      <input type="text" name="address" onChange={handleChange} value={data.address} placeholder="Address" />
      <input type="file" name="photo" onChange={handleFileChange} placeholder="Upload Photo" />
      <button type="submit">Save</button>
    </form>
  );
};

export default Form;
