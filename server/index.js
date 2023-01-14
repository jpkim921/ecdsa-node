const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;
const createBalances = require("./helper.js");

app.use(cors());
app.use(express.json());

const balances = createBalances()
// {
//   '0x2f8abc21c94e6387d6cda65fc73a2e3d9d244798': 100,
//   '0x1290fe9d7dccf536340ed3cb8abf20143146aef5': 200,
//   '0x01ec2244251e7e047005b6af81cee9f871eea561': 300
// }

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  const { sender, recipient, amount } = req.body;

  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
