import React, { useState } from "react";

const ContactList = ({ contacts, handleDelete, handleUpdate }) => {
  const [updatedNum, setUpdatedNum] = useState({ id: null, number: "" });

  const handleInputChange = (id, value) => {
     
    setUpdatedNum({ id: id, number: value });
    
  };

  const handleUpdateClick = (id) => {
    if (updatedNum.id === id && updatedNum.number) {
      const numToUpdate = updatedNum.number;
      if (numToUpdate !== contacts.find((person) => person.id === id).number) {
        handleUpdate(id, { number: numToUpdate });
        setUpdatedNum({ id: null, number: "" }); // Clear input after update
      }
    }
  };

  return (
    <ul>
      {contacts.map((person) => (
        <li key={person.id}>
          {person.name} {person.number} {JSON.stringify(person)}
          <input
            type="text"
            value={updatedNum.id === person.id ? updatedNum.number : ""}
            onChange={(e) => handleInputChange(person.id, e.target.value)}
          />
          <button onClick={() => handleUpdateClick(person.id)}>Update</button>
          <button onClick={() => handleDelete(person.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
};

export default ContactList;
