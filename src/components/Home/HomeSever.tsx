import { getUser } from "@/src/infra/userApi";
import { HomeClient } from "./HomeClient";
import { UserData } from "./components/CardUser";
interface HomeSeverProps {
  users: UserData[]; // Props là một object có key tên là 'users'
}
export  const  HomeSever = async ({users}:HomeSeverProps) => {
  
return(<HomeClient userData={users}/>);
};