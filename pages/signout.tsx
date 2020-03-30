
import { useEffect } from "react";


const CallbackLoginPage = () => {


  useEffect(() => {
      localStorage.removeItem("GOOGLE_ACCESS_TOKEN");
      localStorage.removeItem("GOOGLE_REFRESH_TOKEN");
  }, []);

  return <h1>Thank you for sign out</h1>;
};



export default CallbackLoginPage;
