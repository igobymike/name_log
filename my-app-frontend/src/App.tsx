import React, { useState, useEffect } from 'react';
import './App.css';

const App: React.FC = () => {
  const [firstName, setFirstName] = useState('');  // State for first name input
  const [lastName, setLastName] = useState('');  // State for last name input
  const [names, setNames] = useState<{ first_name: string; last_name: string }[]>([]);  // State for list of names

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();  // Prevent form submission from reloading the page
    const response = await fetch('https://namelog-8e62b6515f53.herokuapp.com', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ firstName, lastName }),  // Send the first and last name as JSON
    });
    const data = await response.json();  // Parse the response as JSON
    setNames([...names, data]);  // Update the list of names with the new entry
  };

  useEffect(() => {
    const fetchNames = async () => {
      const response = await fetch('https://namelog-8e62b6515f53.herokuapp.com');  // Fetch all names from the server
      const data = await response.json();  // Parse the response as JSON
      setNames(data);  // Update the state with the fetched names
    };
    fetchNames();
  }, []);

  return (
    <div className="App">
      <h1>Enter Your Name</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}  // Update state on input change
          placeholder="First Name"
        />
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}  // Update state on input change
          placeholder="Last Name"
        />
        <button type="submit">Submit</button>
      </form>
      <h2>Names List</h2>
      <ul>
        {names.map((name, index) => (
          <li key={index}>
            {name.first_name} {name.last_name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
