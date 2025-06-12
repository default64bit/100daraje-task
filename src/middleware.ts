import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import GuestGuard from "@/middlewares/guards/guest.guard";
import AuthGuard from "@/middlewares/guards/auth.guard";

export async function middleware(req: NextRequest) {
    let res = new NextResponse();
    res = NextResponse.rewrite(new URL(req.nextUrl.pathname + req.nextUrl.search, req.url));

    const [guestAllowed, guestResponse] = await GuestGuard(req, res, ["/login/"]);
    if (!guestAllowed) return NextResponse.redirect(new URL("/dashboard", req.url));
    res = guestResponse;

    const [authAllowed, authResponse] = await AuthGuard(req, res, ["/dashboard/"]);
    if (!authAllowed) return NextResponse.redirect(new URL("/login", req.url));
    res = authResponse;

    return res;
}

export const config = {
    matcher: ["/((?!api|_next/static|.*svg|.*png|.*jpg|.*jpeg|.*gif|.*webp|_next/image|favicon.ico).*)"],
};
