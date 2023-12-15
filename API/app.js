const express = require("express");
const app = express();
const port = 5000;
const cors = require("cors");
const router = require("./Routes/index")

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/fractal", router)

app.listen(port, () => {
  console.log(`Servidor Express escuchando en el puerto ${port}`);
});