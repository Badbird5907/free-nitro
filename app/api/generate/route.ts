import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function GET(req: NextRequest) {
  let hex = "";
  for (let i = 0; i < 65; i++) {
    hex += Math.floor(Math.random() * 16).toString(16);
  }
  let data = JSON.stringify({
    "partnerUserId": "17d9600c5e7923d4dec40514b538ba227aa58ed608b9c5a8d7ade36a31fac9a2"
  });

  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'https://api.discord.gx.games/v1/direct-fulfillment',
    headers: {
      'authority': 'api.discord.gx.games',
      'accept': '*/*',
      'accept-language': 'en-US,en;q=0.9',
      'content-type': 'application/json',
      'origin': 'https://www.opera.com',
      'referer': 'https://www.opera.com/',
      'sec-ch-ua': '"Opera GX";v="105", "Chromium";v="119", "Not?A_Brand";v="24"',
      'sec-ch-ua-mobile': '?0',
      'sec-ch-ua-platform': '"Windows"',
      'sec-fetch-dest': 'empty',
      'sec-fetch-mode': 'cors',
      'sec-fetch-site': 'cross-site',
      'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36 OPR/105.0.0.0'
    },
    data : data
  };
  const res = await axios.request(config);
  const { token } = res.data;
  return new NextResponse(`https://discord.com/billing/partner-promotions/1180231712274387115/${token}`);
}