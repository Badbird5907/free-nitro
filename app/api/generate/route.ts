import { NextRequest, NextResponse } from "next/server";
import axios, { AxiosError } from "axios";

export const fetchCache = 'force-no-store';
export const revalidate = 0;
export const dynamic = "force-dynamic";
export async function GET(req: NextRequest) {
  let hex = "";
  for (let i = 0; i < 65; i++) {
    hex += Math.floor(Math.random() * 16).toString(16);
  }
  let data = JSON.stringify({
    "partnerUserId": hex,
  });

  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'https://api.discord.gx.games/v1/direct-fulfillment',
    headers: {
      'Content-Type': 'application/json'
    },
    data: data
  };

  try {
    const { token } = (await axios.request(config)).data;
    return new NextResponse(`https://discord.com/billing/partner-promotions/1180231712274387115/${token}`, {
      status: 200,
      headers: {
        "Cache-Control": "no-cache"
      }
    });
  } catch (e: any) {
    const err = e as AxiosError;
    if (err.response) {
      return new NextResponse(JSON.stringify({
        message: (err.response.data as any).message || err,
      }), {
        status: err.response.status,
        headers: {
          "Cache-Control": "no-cache"
        }
      });
    } else {
      return new NextResponse(JSON.stringify({
        message: err.message,
      }), {
        status: 500,
        headers: {
          "Cache-Control": "no-cache"
        }
      });
    }
  }
}

