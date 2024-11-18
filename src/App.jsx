import { useState } from "react";
import { ListItem } from "./components/list-item";
import { Button } from "./components/button";
import "./App.css";

const friends = [
  {
    id: crypto.randomUUID(),
    name: "John",
    description: "John is a good friend",
    balance: 0,
  },
  {
    id: crypto.randomUUID(),
    name: "Jane",
    description: "Jane is a good friend",
    balance: 20,
  },
  {
    id: crypto.randomUUID(),
    name: "Joe",
    description: "Joe is a good friend",
    balance: 10,
  },
  {
    id: crypto.randomUUID(),
    name: "Jill",
    description: "Jill is a good friend",
    balance: -5,
  },
  {
    id: crypto.randomUUID(),
    name: "Jack",
    description: "Jack is a good friend",
    balance: -10,
  },
];

function App() {
  const [selectedFriend, setSelectedFriend] = useState(null);

  function handleSubmit(event) {
    event.preventDefault();
  }

  function handleClickFriend(friend) {
    setSelectedFriend((previous) =>
      previous?.id === friend.id ? null : friend
    );
  }

  return (
    <>
      <header>
        <h1>Racha-conta</h1>
      </header>
      <main style={{ display: "flex", gap: "3rem", marginTop: "1rem" }}>
        <ol>
          {friends.map((friend) => {
            const isSelectedFriend = friend.id === selectedFriend?.id;

            return (
              <ListItem
                key={friend.id}
                friend={friend}
                isSelectedFriend={isSelectedFriend}
                onClick={handleClickFriend}
              />
            );
          })}
        </ol>
        {selectedFriend && (
          <form
            style={{
              border: "2px solid lightgrey",
              padding: "1rem .5rem",
              borderRadius: ".25rem",
              display: "flex",
              flexDirection: "column",
            }}
            onSubmit={handleSubmit}
          >
            <h2 style={{marginBottom: "1rem"}}>Rache a conta com {selectedFriend.name}</h2>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: ".25rem",
                flexGrow: "1",
                fontSize: ".85rem",
              }}
            >
              <label style={{ display: "flex", flexDirection: "column" }}>
                Valor
                <input type="number" />
              </label>
              <label style={{ display: "flex", flexDirection: "column" }}>
                Seus gastos
                <input type="number" />
              </label>
              <label style={{ display: "flex", flexDirection: "column" }}>
                Quem vai pagar
                <select>
                  <option value="">Eu</option>
                  <option value="friend">{selectedFriend.name}</option>
                </select>
              </label>
            </div>
            <Button onClick={() => console.log("ASLJDHASKJDHASKJ")}>Calcular</Button>
          </form>
        )}
      </main>
    </>
  );
}

export { App };
