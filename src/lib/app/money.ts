import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { SessionBecauseTypescriptSucksBalls } from "../types/session";
import axios from "axios";

export type MoneyResponse = {
  money: number
}

export const getMoney = async (): Promise<MoneyResponse> => {
  const session = await getServerSession(authOptions) as SessionBecauseTypescriptSucksBalls;
  const email = session.user.email || "email@email.com"; // Should never be the case anyways
  await new Promise((resolve) => setTimeout(resolve, 3000));
  const response = await axios.get(`http://localhost:8082/api/routes/{email}/stats`)
  const money = response.data.money
  return {money}
}
