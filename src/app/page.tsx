import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { cookies } from "next/headers";

export default async function Home() {
    const cookiesStored = await cookies();
    const userData = cookiesStored.get("user");

    return (
        <div className="flex flex-col items-center gap-4">
            <h1 className="text-2xl font-bold">Welcome</h1>
            {!!userData ? (
                <Link href="/dashboard">
                    <Button>Go To Dashboard</Button>
                </Link>
            ) : (
                <Link href="/login">
                    <Button>Login</Button>
                </Link>
            )}
        </div>
    );
}
