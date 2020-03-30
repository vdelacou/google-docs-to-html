import { NextApiRequest, NextApiResponse } from "next";
import { OAuth2Client } from "googleapis-common";
import getHost from "../../../utils/get-host";

const SCOPES = ["https://www.googleapis.com/auth/drive"];

export default (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { query: { state } } = req;
    const hostName = `${getHost(req)}/callbackLogin`;
    const oAuth2Client = new OAuth2Client(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      hostName
    );
    const authorizeUrl = oAuth2Client.generateAuthUrl({
      access_type: "offline",
      scope: SCOPES.join(" "),
      state: state as string,
    });
    console.log('we get authorizeUrl',authorizeUrl)

    res.status(200).json({authorizeUrl})
  } catch (err) {
    res.status(500).json({ statusCode: 500, message: err.message });
  }
};
