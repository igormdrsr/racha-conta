import { useState } from "react";
import { Button } from "./button";

const FORM_STYLES = {
  border: "2px solid lightgrey",
  padding: "1rem .5rem",
  borderRadius: ".25rem",
  display: "flex",
  flexDirection: "column",
  maxHeight: "fit-content",
};

const INPUT_CONTAINER_STYLES = {
  display: "flex",
  flexDirection: "column",
  gap: ".25rem",
  flexGrow: "1",
  fontSize: ".85rem",
  marginBottom: "1rem",
};

const LABEL_STYLES = { display: "flex", flexDirection: "column" };

const BUTTON_STYLES = {
  padding: ".5rem 1rem",
  border: "none",
  borderRadius: ".25rem",
  cursor: "pointer",
  background: "#18181b",
  color: "#e4e4e7",
};

function FormSplitBill({ selectedFriend, onSplitBill }) {
  const [totalBill, setTotalBill] = useState("");
  const [myExpenses, setMyExpenses] = useState("");
  const [whoWillPay, setWhoWillPay] = useState("eu");

  function handleSubmit(event) {
    event.preventDefault();

    const data = {
      totalBill,
      myExpenses,
      whoWillPay,
    };

    onSplitBill(data);

    setTotalBill("");
    setMyExpenses("");
    setWhoWillPay("eu");
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
    <form style={FORM_STYLES} onSubmit={handleSubmit}>
      <h2 style={{ marginBottom: "1rem" }}>
        Rache a conta com {selectedFriend.name}
      </h2>
      <div style={INPUT_CONTAINER_STYLES}>
        <label style={LABEL_STYLES}>
          Valor
          <input type="number" value={totalBill} onChange={handleChangeBill} />
        </label>
        <label style={LABEL_STYLES}>
          Seus gastos
          <input
            type="number"
            value={myExpenses}
            onChange={handleChangeMyExpenses}
          />
        </label>
        <label style={LABEL_STYLES}>
          Quem vai pagar
          <select value={whoWillPay} onChange={handleChangeWhoWillPay}>
            <option value="eu">Eu</option>
            <option value={selectedFriend.name}>{selectedFriend.name}</option>
          </select>
        </label>
      </div>
      <button style={BUTTON_STYLES}>Calcular</button>
    </form>
  );
}

export { FormSplitBill };
