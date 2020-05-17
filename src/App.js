import React, { useState, useEffect } from "react";

import "./styles.css";

import api from './services/api'


function App() {

  const [repositories, setRepositories] = useState([])

  useEffect(() => {

    api.get('/repositories').then(response => {
      setRepositories(response.data)
    })

  }, [])

  async function handleAddRepository() {
    
    const response = await api.post('/repositories', {
      title: `Novo Repositório ${Date.now()}`,
      owner: 'Heitor Cordeiro'
    })

    const repository = response.data

    setRepositories([...repositories, repository])


  }

  async function handleRemoveRepository(id) {
    
    
    const response = await api.delete(`repositories/${id}`)
    
    
    setRepositories([...repositories.filter(repository => repository.id !== id)])



  }

  return (
    <div>
    { repositories.map( repository => (
      <ul key={repository.id} data-testid="repository-list">
       <li>
         {repository.title}

         <button onClick={() => handleRemoveRepository(repository.id)}>
           Remover
         </button>
       </li>
     </ul>
      ))
    }
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
