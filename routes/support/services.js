const connection = require("../../connection");

const fetchSupportTicket = (req, res) => {
  const { username } = req?.body || {};
  if (!username) {
    res.status(400).send("Username field is required");
  }

  connection.query(
    `SELECT * from support where user_name=?`,
    [username],
    (error, result) => {
      if (error) {
        return res.status(502).send({ status: false, error });
      }

      res.status(200).send({ status: true, result });
    }
  );
};

const createSupportTicket = (req, res) => {
  const { username, subject, message } = req?.body || {};

  if (!username) {
    res.status(400).send("Username field is required");
  }
  if (!subject) {
    res.status(400).send("Subject field is required");
  }
  if (!message) {
    res.status(400).send("Message is required");
    return;
  }

  try {
    connection.query(
      "INSERT INTO support (user_name, subject, message,reply) VALUES (?,?,?,'')",
      [username, subject, message],
      (error, result) => {
        if (error) {
          res.status(500).json(error);
          return;
        }

        if (result?.affectedRows === 1) {
          result.insertId;
          res.json({
            status: true,
            message: "New support request created successfully",
            userId: { ...result, ...req.body },
          });
          return;
        } else {
          res.json({
            status: false,
            message: "Failed to create a new support request",
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
  createSupportTicket,
  fetchSupportTicket,
};
