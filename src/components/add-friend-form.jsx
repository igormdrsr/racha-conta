import { useState } from "react";

function FormAddFriend({ onFormSubmit }) {
  const [friendName, setFriendName] = useState("");

  function handleFormSubmit(event) {
    event.preventDefault();

    if (!friendName.trim()) return;

    const user = {
      id: crypto.randomUUID(),
      name: friendName.trim(),
      balance: 0,
    };
    onFormSubmit(user);

    setFriendName("");
  }

  return (
    <form onSubmit={handleFormSubmit}>
      <div>
        <input
          type="text"
          value={friendName}
          placeholder="Nome do amigo"
          onChange={(event) => setFriendName(event.target.value)}
        />
        <button type="submit">Adicionar</button>
      </div>
    </form>
  );
}

export { FormAddFriend };
