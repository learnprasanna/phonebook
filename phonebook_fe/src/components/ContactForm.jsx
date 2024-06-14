import React from "react";

const ContactForm = ({ newName, newNum, handleNameChange, handleNumChange, handleSubmit }) => (
  <form onSubmit={handleSubmit}>
    <div>
      Name: <input value={newName} onChange={handleNameChange} />
    </div>
    <div>
      Number: <input value={newNum} onChange={handleNumChange} />
    </div>
    <div>
      <button type="submit">Add</button>
    </div>
  </form>
);

export default ContactForm;
