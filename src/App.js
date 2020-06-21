import React, { useState, useEffect } from "react";

import api from './services/api'

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([])

  useEffect(() => {
    api.get('/repositories').then((response) => {
      setRepositories(response.data)
    })
  }, [])

  async function handleAddRepository() {
    const newRepository = {
      title: `Novo projeto ${Date.now()}`,
      url:  "https://github.com/Hagnasid/Node-http",
      techs: "node, typescript, css"
    }

    const response = await api.post('/repositories' , newRepository)
    console.log(response.status)

    const addNewRepository = response.data

    if (response.status === 200) {
      setRepositories([...repositories, addNewRepository])
      console.log(repositories)
    }
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`/repositories/${id}`)

    if (response.status === 204) {
      const newRepositories = repositories.filter((project) => project.id !== id)
      setRepositories(newRepositories)
    }

  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repository) => (
          <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
              </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
