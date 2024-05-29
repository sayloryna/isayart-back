import mongoose from "mongoose";
import chalk from "chalk";

const connectToDataBase = async (dataBaseUrl: string): Promise<void> => {
  try {
    await mongoose.connect(dataBaseUrl);
    console.log(chalk.greenBright("Gracefully connected to Database "));
  } catch (error) {
    console.log(
      chalk.red("failed to connect to DataBase: ") +
        (error as { message: string }).message,
    );
  }
};

export default connectToDataBase;
