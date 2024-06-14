// App.jsx

import React, { useState, useEffect } from "react";
import ContactList from "./components/ContactList";
import ContactForm from "./components/ContactForm";
import phonebookService from "./services/phonebook";
import "./styles/styles.css";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNum, setNewNum] = useState("");
  const [filter, setFilter] = useState("");
  const [addedContactName, setAddedContactName] = useState(""); // New state variable

  useEffect(() => {
    phonebookService
      .getAll()
      .then((initialPersons) => {
        setPersons(initialPersons);
      })
      .catch((error) => {
        console.error("There was an error fetching the data:", error);
      });
  }, []);

  const handleClick = (event) => {
    event.preventDefault();
    if (persons.some((person) => person.name === newName)) {
      alert(`${newName} is already in the phonebook`);
    } else {
      const maxId =
        persons.length > 0
          ? Math.max(...persons.map((person) => person.id)) + 1
          : 1;
      const newPerson = { name: newName, number: newNum, id: maxId.toString() };
      phonebookService.create(newPerson).then((returnedPerson) => {
        setPersons([...persons, returnedPerson]);
        setNewName("");
        setNewNum("");
        setAddedContactName(returnedPerson.name); // Update added contact name

        // Clear added contact message after 2 seconds
        setTimeout(() => {
          setAddedContactName("");
        }, 2000);
      });
    }
  };

  const handleFilter = (event) => {
    setFilter(event.target.value);
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumChange = (event) => {
    setNewNum(event.target.value);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this contact?")) {
      phonebookService
        .remove(id)
        .then(() => {
          setPersons((prevPersons) =>
            prevPersons.filter((person) => person.id !== id)
          );
          alert("Contact deleted successfully.");
        })
        .catch((error) => {
          console.error("Error deleting contact:", error);
          alert("Failed to delete contact.");
        });
    }
  };

  const handleUpdate = (id, updatedData) => {
    const person = persons.find((person) => person.id === id);
    const updatedPerson = { ...person, ...updatedData };

    phonebookService.update(id, updatedPerson).then((returnedPerson) => {
      setPersons(
        persons.map((person) => (person.id !== id ? person : returnedPerson))
      );
    });
  };

  // Filtering the contacts based on the filter value
  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        {addedContactName && (
          <p className="contact_added">
            {addedContactName} has been added to the phonebook.
          </p>
        )}
      </div>
      <form>
        <div>
          Filter: <input value={filter} onChange={handleFilter} />
        </div>
      </form>
      <ContactForm
        newName={newName}
        newNum={newNum}
        handleNameChange={handleNameChange}
        handleNumChange={handleNumChange}
        handleSubmit={handleClick}
      />
      <ContactList
        contacts={filteredPersons}
        handleDelete={handleDelete}
        handleUpdate={handleUpdate}
      />
    </div>
  );
};

export default App;
