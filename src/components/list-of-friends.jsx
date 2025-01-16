import { getMsgInfo } from "../utils/getMessageInfo";

function ListOfFriends({ friends, selectedFriend, onFriendClick }) {
  const OL_STYLES = {
    display: "flex",
    flexDirection: "column",
    gap: ".5rem",
  };

  const LI_STYLES = {
    padding: "1rem .5rem",
    display: "flex",
    flexDirection: "column",
    gap: ".5rem",
    border: "2px solid lightgrey",
    borderRadius: ".25rem",
  };

  const BUTTON_STYLES = {
    padding: ".5rem 1rem",
    border: "none",
    borderRadius: ".25rem",
    cursor: "pointer",
    background: "#18181b",
    color: "#e4e4e7",
  };

  return (
    <ol style={OL_STYLES}>
      {friends.map((friend) => {
        const isSelectedFriend = friend.id === selectedFriend?.id;
        const { message } = getMsgInfo(friend.balance);

        return (
          <li key={friend.id} style={LI_STYLES}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <h3>{friend.name}</h3>
              <button
                style={BUTTON_STYLES}
                onClick={() => onFriendClick(friend)}
              >
                {isSelectedFriend ? "Fechar" : "Selecionar"}
              </button>
            </div>
            <p>{message}</p>
          </li>
        );
      })}
    </ol>
  );
}

export { ListOfFriends };
