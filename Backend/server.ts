import dotenv from "dotenv";
import app from "./src/app";
import syncRoute from "./src/routes/sync.route";

dotenv.config();

const PORT = process.env.PORT || 5000;

app.use("/api/sync", syncRoute);

app.listen(PORT,()=>{
    console.log("server running on port "+PORT);
})