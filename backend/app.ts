import express from "express";
import router from "./src/routers/polisRouter";

const app = express();

app.use(express.json());
app.use("/api", router);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
