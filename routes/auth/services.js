const connection = require("../../connection");

const checkInvalidRequest = (res, status, message, field) => {
  if (!field) res.status(status).send(message);
};

const onLogin = (req, res) => {
  const { username, password } = req?.body || {};
  checkInvalidRequest(res, 400, "Username is required", username);
  checkInvalidRequest(res, 400, "Password is required", password);

  connection.query(
    `SELECT * from user_registration where user_name=? AND password=?`,
    [username, password],
    (error, result) => {
      if (!result)
        res.status(400).json({
          status: false,
          message: "Username / Password doesn't match our record",
        });

      const { password, ...data } = result;
      console.log({ data: data.password });
      res.status(200).send({ status: true, data: data });
    }
  );
};

const onRegister = (req, res) => {
  const {
    username,
    password,
    sponsorId = null,
    fullname,
    country,
  } = req?.body || {};
  checkInvalidRequest(res, 400, "Username is required", username);
  checkInvalidRequest(res, 400, "Password is required", password);
  checkInvalidRequest(res, 400, "Full name is required", fullname);
  checkInvalidRequest(res, 400, "Country is required", country);

  connection.query(
    "INSERT INTO user_registration (user_name, full_name, password, sponsor_name) VALUES (?, ?, ?, ?)",
    [username, fullname, password, sponsorId],
    (error, result) => {
      if (error) res.status(500).json(error);

      console.log({ result });
      if (result.affectedRows === 1) {
        const insertId = result.insertId;
        res.json({
          status: true,
          message: "New user created successfully",
          userId: result,
        });
      } else {
        res.json({
          status: false,
          message: "Failed to create a new user",
        });
      }

      const { password, ...data } = result;

      //   res.status(200).send({ status: true, data: data });
    }
  );
};

module.exports = {
  onLogin,
  onRegister,
};
