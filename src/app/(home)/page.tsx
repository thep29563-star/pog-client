import { HomeSever } from "@/src/components/Home/HomeSever";
import { getUser } from "@/src/infra/userApi";

export default async function  Home() {
  const users = await getUser();

  return <HomeSever users ={users}/>;
}
