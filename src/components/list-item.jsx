function ListItem({ friend, isSelectedFriend, onClick }) {
  return (
    <li
      key={friend.id}
      className={isSelectedFriend ? "highlight" : ""}
      style={{ padding: ".5rem 1rem" }}
    >
      <h3>{friend.name}</h3>
      <p>{friend.description}</p>
      <button onClick={() => onClick(friend)}>
        {isSelectedFriend ? "Fechar" : "Selecionar"}
      </button>
    </li>
  );
}

export { ListItem };