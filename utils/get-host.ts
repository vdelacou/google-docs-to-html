import { NextApiRequest } from "next";
import { IncomingMessage } from "http";

function getHost(req:NextApiRequest) {
    if (!req) return ''
  
    const { host } = req.headers
  
    if (host && host.startsWith('localhost')) {
      return `http://${host}`
    }
    return `https://${host}`
  }

  export function getHostIncomingMessage(req:IncomingMessage) {
    if (!req) return ''
  
    const { host } = req.headers
  
    if (host && host.startsWith('localhost')) {
      return `http://${host}`
    }
    return `https://${host}`
  }
  
  export default getHost