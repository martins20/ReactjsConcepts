// eslinnt-disable
import React, { useState, useEffect } from "react";

import "./styles.css";

import api from "./services/api";

function App() {
  const [repositories, setRepositories] = useState([]);
  const [count, setCount] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const handleGetData = async () => {
      const { data } = await api.get("repositories");

      setRepositories(data);

      setLoading(false);
    };

    handleGetData();
  }, []);

  async function handleAddRepository() {
    const repositorie = {
      title: `Repositório ${count}`,
      url: "https://github.com/martins20",
      techs: ["Nodejs", "uuid", "jest"],
    };

    const { data } = await api.post("/repositories", repositorie);

    setRepositories([...repositories, data]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);
    const updatedRepositories = repositories.filter(
      (repository) => repository.id !== id
    );

    setRepositories(updatedRepositories);
    setCount(count - 1);
  }

  return (
    <div>
      {loading ? (
        ""
      ) : (
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
      )}
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
