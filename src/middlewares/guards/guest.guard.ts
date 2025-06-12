import { NextRequest, NextResponse } from "next/server";

export default async function main(req: NextRequest, res: NextResponse, routes: string[]): Promise<[boolean, NextResponse]> {
    const allowUserToViewPage = true;
    const pathname = `${req.nextUrl.pathname}/`.replaceAll("//", "/");

    let runTheGuard = false;
    for (const route of routes) {
        if (pathname.includes(route)) {
            runTheGuard = true;
            break;
        }
    }
    if (!runTheGuard) return [allowUserToViewPage, res];

    // get the cookie
    const authToken = req.cookies.get("AuthToken")?.value || "";

    // if the token does not exist user is not logged in then allow user as guest
    if (!authToken) return [allowUserToViewPage, res];

    return [!allowUserToViewPage, res];
}
