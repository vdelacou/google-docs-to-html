import { NextApiRequest, NextApiResponse } from "next";
import { OAuth2Client } from "googleapis-common";
import getHost from "../../../utils/get-host";


export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { query: { code,state } } = req;
    if(code === undefined){
      throw new Error("No code")
    }
    console.log('we get code',code)
    const hostName = `${getHost(req)}/callbackLogin`;
    const oAuth2Client = new OAuth2Client(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      hostName
    );
    const { tokens } = await oAuth2Client.getToken(code as string);
    console.log('we get token',tokens)

    res.status(200).json({tokens,state})
  } catch (err) {
    res.status(500).json({ statusCode: 500, message: JSON.stringify(err) });
  }
};
