import { useState, useEffect } from "react";
import "./App.scss";
import { getCharacters, CharacterData, Status } from "./api/api";
import Card from "./components/Card";

type Sort = "name" | "status";

const statusValues: Record<Status, number> = {
  Alive: 1,
  unknown: 2,
  Dead: 3,
};

const App: React.FC = () => {
  const [filterName, setFilterName] = useState("");
  const [characters, setCharacters] = useState<CharacterData[]>([]);
  const [sortBy, setSortBy] = useState<Sort>("status");
  const [sortAsc, setSortAsc] = useState(true);

  useEffect(() => {
    const getData = async () => {
      const newCharacters = await getCharacters();
      setCharacters(newCharacters);
    };

    getData();
  }, []);

  const sortByName = (a: CharacterData, b: CharacterData): number => {
    if (a.name < b.name) {
      return -1;
    }

    if (a.name > b.name) {
      return 1;
    }

    return 0;
  };

  const sortByStatus = (a: CharacterData, b: CharacterData): number => {
    if (statusValues[a.status] < statusValues[b.status]) {
      return -1;
    }

    if (statusValues[a.status] > statusValues[b.status]) {
      return 1;
    }

    return 0;
  };

  const sort = (newCharacters: CharacterData[]) => {
    if (sortBy === "name") {
      newCharacters.sort((a, b) => {
        if (sortAsc) {
          return sortByName(a, b);
        }

        return sortByName(b, a);
      });
    } else {
      newCharacters.sort(sortByName);

      newCharacters.sort((a, b) => {
        if (sortAsc) {
          return sortByStatus(a, b);
        }

        return sortByStatus(b, a);
      });
    }

    setCharacters(newCharacters);
  };

  useEffect(() => {
    sort([...characters]);
  }, [sortBy, sortAsc]);

  const onRemove = (id: number) => {
    const newCharacters = [...characters];
    const cardIdx = newCharacters.findIndex((card) => card.id === id);

    newCharacters.splice(cardIdx, 1)[0];
    setCharacters(newCharacters);
  };
  const renderCharacter = (character: CharacterData) => (
    <Card key={`rm-${character.id}`} {...character} onRemove={onRemove} />
  );

  return (
    <main>
      <form className="filter-form">
        <div className="filter-wrapper">
          <div className="filter-element">
            <label className="filter-label" htmlFor="filter-by-name">
              Fiter by name:
            </label>
            <input
              className="filter-input"
              id="filter-by-name"
              type="text"
              placeholder="Fitler users by name"
              value={filterName}
              onChange={(e) => setFilterName(e.target.value)}
            />
          </div>
          <div className="filter-element">
            <button
              type="button"
              className="filter-button"
              onClick={() => {
                setSortAsc((prevState) =>
                sortBy === "name" ? !prevState : true
                );
                setSortBy("name");
              }}
              >
              Sort by name
            </button>
            <button
              type="button"
              className="filter-button"
              onClick={() => {
                setSortAsc((prevState) =>
                  sortBy === "status" ? !prevState : true
                );
                setSortBy("status");
              }}
            >
              Sort by status
            </button>
          </div>
        </div>
      </form>
      <section className="content">
        <section className="cards-container">
          {filterName
            ? characters
                .filter((character) =>
                  character.name
                    .toLowerCase()
                    .includes(filterName.toLowerCase())
                )
                .map(renderCharacter)
            : characters.map(renderCharacter)}
        </section>
      </section>
    </main>
  );
};

export default App;
