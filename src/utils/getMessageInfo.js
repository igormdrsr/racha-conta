function getMsgInfo(balance) {
  let message;
  let color;

  if (balance < 0) {
    message = `Está devendo ${Math.abs(balance)} reais para você!`;
    color = "red";
  } else if (balance > 0) {
    message = `Você está devendo ${balance} reais!`;
    color = "green";
  } else {
    message = `Não há débitos pendentes!`;
    color = "lightblue";
  }

  return { message, color };
}

export { getMsgInfo };