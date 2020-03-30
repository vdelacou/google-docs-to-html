import { NextApiRequest, NextApiResponse } from "next";
import { OAuth2Client } from "googleapis-common";
import { google } from "googleapis";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const {
      query: { id, accessToken, refreshToken }
    } = req;

    console.log("accessToken", accessToken);
    if (id === undefined) {
      throw new Error("No Google Id");
    }
    if (accessToken === undefined || refreshToken === undefined) {
      throw new Error("No Tokens");
    }
    const oAuth2Client = new OAuth2Client(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET
    );
    oAuth2Client.credentials = {
      access_token: accessToken as string,
      refresh_token: refreshToken as string
    };
    const drive = google.drive({ version: "v3", auth: oAuth2Client });
    const doc = await drive.files.export(
      {
        fileId: id as string, // A Google Doc
        mimeType: "text/html"
      },
      {
        // Make sure we get the binary data
        responseType: "text"
      }
    );
    const fileInfo = await drive.files.get({
      fileId: id as string
    });
    console.log("File name: ", fileInfo.data.name);

    res
      .status(200)
      .json({ statusCode: 200, html: doc.data, title: fileInfo.data.name });
  } catch (err) {
    if (err.message) {
      const errorParsed = JSON.parse(err.message);
      if (
        errorParsed &&
        errorParsed.error &&
        errorParsed.error.errors &&
        errorParsed.error.errors[0] &&
        errorParsed.error.errors[0].message
      ) {
        res
          .status(500)
          .json({
            statusCode: 500,
            message: errorParsed.error.errors[0].message
          });
      } else {
        res.status(500).json({ statusCode: 500, message: err.message });
      }
    } else {
      res.status(500).json({ statusCode: 500, message: err });
    }
  }
};
