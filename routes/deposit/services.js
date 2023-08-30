const connection = require("../../connection");

const fetchDeposits = (req, res) => {
  const { username, password } = req?.body || {};
  if (!username) {
    res.status(400).send("Username field is required");
  }

  connection.query(
    `SELECT * from payment-requests where user_name=?`,
    [username],
    (error, result) => {
      if (!result?.length) {
        res.status(404).json({
          status: false,
          message: "User does not exist",
        });
        return;
      }

      if (error) {
        return res.status(502).send({ status: false, error });
      }

      res.status(200).send({ status: true, result });
    }
  );
};

const createDeposit = (req, res) => {
  const { username, email, desired_balance, after_tax, tax, btc_address } =
    req?.body || {};

  const date = new Date();

  if (!username) {
    res.status(400).send("Username field is required");
  }
  if (!email) {
    res.status(400).send("Email field is required");
  }
  if (!desired_balance) {
    res.status(400).send("Desired Amount is required");
    return;
  }
  if (!after_tax) {
    res.status(400).send("After Tax Amount is required");
    return;
  }

  if (!tax) {
    res.status(400).send("Tax field is required");
    return;
  }

  if (!btc_address) {
    res.status(400).send("Wallet Address is not set yet");
    return;
  }

  try {
    connection.query(
      "INSERT INTO withdrawal (user_name, email, desire_amount, amount_after_tax, tax,mode,btc_address,date,status,reject_reason) VALUES (?, ?, ?, ?, ?, ?,?,?, 'PENDING', '')",
      [username, email, desired_balance, after_tax, tax, "", btc_address, date],
      (error, result) => {
        if (error) {
          res.status(500).json(error);
          return;
        }

        if (result?.affectedRows === 1) {
          result.insertId;
          res.json({
            status: true,
            message: "New withdrawal request created successfully",
            userId: { ...result, ...req.body },
          });
          return;
        } else {
          res.json({
            status: false,
            message: "Failed to create a new withdrawal request",
          });
        }
      }
    );
  } catch (err) {
    console.log(err);
    res.status(502).send("Something unexpected went wrong");
  }
};

module.exports = {
  createDeposit,
  fetchDeposits,
};
