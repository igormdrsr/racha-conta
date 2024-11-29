import { useState } from "react";
// import { ListItem } from "./components/list-item";
import { Button } from "./components/button";
import "./App.css";

const initalFriends = [
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
];

function getMsgInfo(balance) {
  let message;
  let color;

  if (balance < 0) {
    message = `Está devendo ${Math.abs(balance)} reais para você`;
    color = "red";
  } else if (balance > 0) {
    message = `Você está devendo ${balance} reais`;
    color = "green";
  } else {
    message = `Não há débitos pendentes`;
    color = "lightblue";
  }

  return { message, color };
}

function App() {
  const [friends, setFriends] = useState(initalFriends);
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [totalBill, setTotalBill] = useState("");
  const [myExpenses, setMyExpenses] = useState("");
  const [whoWillPay, setWhoWillPay] = useState("eu");

  function handleSubmit(event) {
    event.preventDefault();

    setFriends((previous) => {
      const updatedFriends = previous.map((friend) => {
        if (friend.id === selectedFriend.id) {
          return {
            ...friend,
            balance:
              whoWillPay === "eu"
                ? friend.balance - (totalBill - myExpenses)
                : friend.balance + myExpenses,
          };
        }

        return friend;
      });

      return updatedFriends;
    });

    setSelectedFriend(null);
    setTotalBill("");
    setMyExpenses("");
    setWhoWillPay("eu");
  }

  function handleClickFriend(friend) {
    setSelectedFriend((previous) =>
      previous?.id === friend.id ? null : friend
    );
  }

  function handleChangeBill(event) {
    setTotalBill(Number(event.target.value));
  }

  function handleChangeMyExpenses(event) {
    setMyExpenses(Number(event.target.value));
  }

  function handleChangeWhoWillPay(event) {
    setWhoWillPay(event.target.value);
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
            const { message, color } = getMsgInfo(friend.balance);

            return (
              <li key={friend.id} style={{ padding: ".5rem 1rem" }}>
                <h3>{friend.name}</h3>
                <p style={{ color }}>{message}</p>
                <button onClick={() => handleClickFriend(friend)}>
                  {isSelectedFriend ? "Fechar" : "Selecionar"}
                </button>
              </li>
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
            <h2 style={{ marginBottom: "1rem" }}>
              Rache a conta com {selectedFriend.name}
            </h2>
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
                <input
                  type="number"
                  value={totalBill}
                  onChange={handleChangeBill}
                />
              </label>
              <label style={{ display: "flex", flexDirection: "column" }}>
                Seus gastos
                <input
                  type="number"
                  value={myExpenses}
                  onChange={handleChangeMyExpenses}
                />
              </label>
              <label style={{ display: "flex", flexDirection: "column" }}>
                Quem vai pagar
                <select value={whoWillPay} onChange={handleChangeWhoWillPay}>
                  <option value="eu">Eu</option>
                  <option value={selectedFriend.name}>
                    {selectedFriend.name}
                  </option>
                </select>
              </label>
            </div>
            <Button>Calcular</Button>
          </form>
        )}
      </main>
    </>
  );
}

export { App };
