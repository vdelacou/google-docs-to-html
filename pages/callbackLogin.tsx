import { GetServerSideProps } from "next";
import { getHostIncomingMessage } from "../utils/get-host";
import fetch from "node-fetch";
import { useEffect } from "react";
import { useRouter } from "next/router";

type Props = {
  errors: string;
  access_token: string;
  state: string;
};

const CallbackLoginPage = ({
  errors,
  access_token,
  state
}: Props) => {
  const router = useRouter();

  useEffect(() => {
    if (access_token) {
      localStorage.setItem("GOOGLE_ACCESS_TOKEN", access_token);
      router.push(state);
    }
  }, []);

  if (errors) {
    return <h1>{errors}</h1>;
  }
  if (state) {
    return null;
  }
  return <h1>Thank you for sign in</h1>;
};

export const getServerSideProps: GetServerSideProps = async ({
  req,
  query
}) => {
  try {
    const code = query?.code;
    const state = query?.state;

    const hostName = getHostIncomingMessage(req);
    const result = await fetch(`${hostName}/api/getToken?code=${code}`);
    const data = await result.json();
    console.log(`getServerSideProps callback login`, data);

    return {
      props: {
        access_token: data.tokens.access_token,
       // refresh_token: data.tokens.refresh_token,
        state: state
      }
    };
  } catch (err) {
    return { props: { errors: err.message } };
  }
};

export default CallbackLoginPage;
