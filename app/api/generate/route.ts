import {AxiosError}                from "axios";
import {NextRequest, NextResponse} from "next/server";

export const fetchCache = "force-no-store";
export const revalidate = 0;
export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
	let hex = "";
	for (let i = 0; i < 65; i++) {
		hex += Math.floor(Math.random() * 16).toString(16);
	}
	try {
		const {token} = await (await fetch("https://api.discord.gx.games/v1/direct-fulfillment", {
			body: JSON.stringify({
				"partnerUserId": hex
			}),
			headers: {
				"Content-Type": "application/json"
			},
			method: "POST",
			redirect: "follow"
		})).json();
		return new NextResponse(`https://discord.com/billing/partner-promotions/1180231712274387115/${token}`, {
			status: 200,
			headers: {
				"Cache-Control": "no-cache"
			}
		});
	} catch (e: any) {
		const err = e as AxiosError;
		return err.response ? new NextResponse(JSON.stringify({
			message: (err.response.data as any).message || err
		}), {
			status: err.response.status,
			headers: {"Cache-Control": "no-cache"}
		}) : new NextResponse(JSON.stringify({
			message: err.message
		}), {
			status: 500,
			headers: {"Cache-Control": "no-cache"}
		});
	}
}

