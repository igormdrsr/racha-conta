import { useState } from "react";
import { FormSplitBill } from "./components/split-bill-form";
import { FormAddFriend } from "./components/add-friend-form";
import { ListOfFriends } from "./components/list-of-friends";
import "./App.css";

const initalFriends = [
  {
    id: crypto.randomUUID(),
    name: "Jackson",
    balance: 0,
  },
  {
    id: crypto.randomUUID(),
    name: "Jó",
    balance: 20,
  },
  {
    id: crypto.randomUUID(),
    name: "Gabriel",
    balance: -10,
  },
];

function App() {
  const [friends, setFriends] = useState(initalFriends);
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [showFormAddFriend, setShowFormAddFriend] = useState(false);

  function handleSplitBill({ totalBill, myExpenses, whoWillPay }) {
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
  }

  function handleClickFriend(friend) {
    setSelectedFriend((previous) =>
      previous?.id === friend.id ? null : friend
    );
  }

  function handleAddFriend(friend) {
    setFriends((previous) => {
      return [...previous, friend];
    });
  }

  return (
    <>
      <header>
        <h1>Racha-conta</h1>
      </header>
      <main style={{ padding: ".5rem" }}>
        <button
          style={{ padding: ".5rem 1rem", marginBottom: ".25rem" }}
          onClick={() => setShowFormAddFriend((previous) => !previous)}
        >
          {showFormAddFriend ? "Fechar" : "Adicionar amigo"}
        </button>

        {showFormAddFriend && <FormAddFriend onFormSubmit={handleAddFriend} />}

        <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
          <ListOfFriends
            friends={friends}
            onFriendClick={handleClickFriend}
            selectedFriend={selectedFriend}
          />

          {selectedFriend && (
            <FormSplitBill
              selectedFriend={selectedFriend}
              onSplitBill={handleSplitBill}
            />
          )}
        </div>
      </main>
    </>
  );
}

export { App };
