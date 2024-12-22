import express, { Application } from "express";
import dotenv from "dotenv";
import routes from "./routes";


dotenv.config();

const app: Application = express();
const PORT: number = parseInt(process.env.PORT || "3000", 10);

app.use(express.json());
routes(app);

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
