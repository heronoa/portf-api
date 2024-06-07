import dotenv from "dotenv";
import mongoose, { Schema, connect, model } from "mongoose";
import User from "../entities/User";
import Project from "../entities/Project";

interface AuthToken {
  email: string;
  token: string;
  expires_at: number;
}

export const userSchema = new Schema<User>({
  id: String,
  email: String,
  hash_password: String,
  acess_token: String,
  permission: Number,
  createdAt: Date,
  updatedAt: Date,
});

export const projectSchema = new Schema<Project>({
  project_id: String,
  title: String,
  desc: String,
  thumb: String,
  images: [String],
});

export const authTokensSchema = new Schema<AuthToken>({
  email: String,
  token: String,
  expires_at: Number,
});

export const UserModel = model<User>("Users", userSchema);
// export const DebtModel = model<Debt>("Debts", debtSchema);
export const ProjectModel = model<Project>("Projects", projectSchema);
// export const CostumerModel = model<Costumer>("Costumers", costumerSchema);
export const AuthTokensModel = model<AuthToken>("AuthTokens", authTokensSchema);

dotenv.config();

async function run() {
  const mongoUrl: string | undefined = process.env.MONGO_DB;
  if (!mongoUrl) {
    return console.error("Missing mongo url env!");
  }
  await connect(mongoUrl as string);
  console.log("mongo connection:", mongoose.connection.readyState);
}

run().catch(err => console.log(err));
