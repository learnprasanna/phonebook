const express = require("express")
const app = express()




var morgan = require("morgan")

const cors = require("cors")


app.use(express.json())
app.use(express.static('dist'))
app.use(morgan("dev"))
app.use(cors())


console.log("#".repeat(30), "START", "#".repeat(30));

let phonebook = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get("/", (request, response) => {
    response.send("Personal Phone Book")
})

app.get("/api/phonebook", (request, response) => {
    response.json(phonebook)
})

app.get("/api/phonebook/:id", (request, response) => {
    const id = Number(request.params.id)
    let contact = phonebook.find(contact => contact.id === id)
    response.json(contact)
})

app.get("/info", (request, response) => {
    // response.send("Info")
    response.send(`Phonebook has info for ${phonebook.length} contacts. <br/> ${Date()}`)
})

app.post("/api/phonebook", (request, response) => {
    let contact = request.body
    console.log("POST DATA",contact)

    if (!contact.name || !contact.number) {
        // If name or number is missing, send an error response
        return response.status(400).json({ error: "Content missing, Check every detail" })
    }

    let temp = phonebook.find(num => num.number === contact.number)
    if (temp) {
        // If the contact already exists, send an error response
        return response.status(400).json({ error: "Contact exists" })
    }

    // Calculate the max ID correctly
    const maxId = phonebook.length > 0 ? Math.max(...phonebook.map(c => c.id)) : 0
    contact.id = maxId + 1

    // Save the new contact
    phonebook = phonebook.concat(contact)
    response.json(contact)
})


app.delete("/api/phonebook/:id", (request, response) => {
    const id = Number(request.params.id)
    phonebook = phonebook.filter(contact => contact.id !== id)
    response.status(204).end()
})


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`)
})