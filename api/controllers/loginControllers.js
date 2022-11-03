const generateJWT = require("../../helpers/generateToken");
const persistance = require("../persistence/persistence");

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await persistance.searchBYEmail(email, password);
   
    if (user != null) {
      
      const {id,email}=user

      const payload = {
        id: id,
        email: email
      };

      res.status(200).json({
        success: true,
        msg: "Authorized",
        user: {
          iduser: id,
          email:email
        },
        token: await generateJWT(payload),
      });
    } else {
      res.status(400).json({
        ok: false,
        msg: "Este usuario no existe",
      });
    }
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Error interno del server",
    });
  }
};

module.exports = { login };
