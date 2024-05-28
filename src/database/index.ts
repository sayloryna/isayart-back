import mongoose from "mongoose";
import chalk from "chalk";

const connectToDataBase = async (dataBaseUrl: string): Promise<void> => {
  await mongoose.connect(dataBaseUrl);
  console.log(chalk.greenBright("Gracefully connected to Database "));
};

export default connectToDataBase;
