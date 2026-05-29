import app from "./app.js";
import { env } from "./config/env.config.js";

const PORT = env.port || 5000;

app.listen(PORT, () => {
  console.log(`Server running successfully on port ${PORT}`);
});
