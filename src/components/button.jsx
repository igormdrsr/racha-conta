function Button({ onClick, children }) {
  return (
    <button
      style={{ padding: ".25rem 0", cursor: "pointer" }}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export { Button };
