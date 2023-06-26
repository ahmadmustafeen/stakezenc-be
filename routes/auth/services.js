const connection = require("../../connection");

const checkInvalidRequest = (res, status, message, field) => {
  if (!field) {
    res.status(status).send(message);
    return;
  }
};

const onLogin = (req, res) => {
  const { username, password } = req?.body || {};
  checkInvalidRequest(res, 400, "Username is required", username);
  checkInvalidRequest(res, 400, "Password is required", password);

  connection.query(
    `SELECT * from user_registration where user_name=? AND password=?`,
    [username, password],
    (error, result) => {
      if (!result?.length) {
        res.status(400).json({
          status: false,
          message: "Username / Password doesn't match our record",
        });
        return;
      }
      const data_ = result?.[0];

      const { password, ...data } = data_;
      res.status(200).send({ status: true, data });
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

  if (!username) {
    res.status(400).send("Username field is required");
  }
  if (!password) {
    res.status(400).send("Password field is required");
    return;
  }
  if (!fullname) {
    res.status(400).send("Full name field is required");
    return;
  }
  // checkInvalidRequest(res, 400, "Username is required", username);
  // checkInvalidRequest(res, 400, "Password is required", password);
  // checkInvalidRequest(res, 400, "Full name is required", fullname);
  // checkInvalidRequest(res, 400, "Country is required", country);

  try {
    connection.query(
      "INSERT INTO user_registration (user_name, full_name, password,pkg_id, sponsor_name,original_invest,roi_monthly,roi_daily2,leader_team_sales,session_code) VALUES (?, ?, ?, 1, ?, 0, 0, 0, 0,'')",
      [username, fullname, password, sponsorId],
      (error, result) => {
        if (error) {
          res.status(500).json(error);
          return;
        }

        if (result?.affectedRows === 1) {
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

        res.status(200).send({ status: true, data: data });
      }
    );
  } catch (err) {
    console.log(err);
    res.status(502).send("Something unexpected went wrong");
  }
};

module.exports = {
  onLogin,
  onRegister,
};
