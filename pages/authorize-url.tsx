import { GetServerSideProps } from 'next'
import  { getHostIncomingMessage } from '../utils/get-host'
import fetch from "node-fetch";

type Props = {
  errors: string;
}

const AuthorizeUrlPage = ({  errors}: Props) => {
    if (errors) {
    return <h1>{errors}</h1>
    }
    return null;
}

export const getServerSideProps: GetServerSideProps = async ({req,res,query})=> {
    try {
      const state = query?.state;
      const hostName = getHostIncomingMessage(req);
      const result = await fetch(`${hostName}/api/authorizeUrl?state=${state}`)
      const data = await result.json();
      console.log(`getServerSideProps`,data)
      res.writeHead(302, {
        Location: data.authorizeUrl
      }).end()
      return {
        props: {}
      }
    } catch (err) {
      return { props: { errors: err.message } }
    }
  }

export default AuthorizeUrlPage
