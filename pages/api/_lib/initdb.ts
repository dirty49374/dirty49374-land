import mongoose from "mongoose";

mongoose.connect((process.env as any).DATABASE_URL);
mongoose.connection.once('open', () => {
  console.log('connected to database');
});
