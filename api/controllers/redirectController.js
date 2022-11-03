const persistance = require("../persistence/persistence");

const redirect = async (req, res) => {
  const { id } = req.params;
  try {
    const column = await persistance.searchById('Tiendas_productos', id);
   
    if (column != null) {
      
      const { url } = column;

      res.redirect(url);
    } else {
      res.status(404).json({
        ok: false,
        msg: "Este link no existe",
      });
    }
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Error interno del server",
    });
  }
};

module.exports = { redirect };