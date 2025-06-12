import LoginForm from "@/components/login/LoginForm";
import { cookies } from "next/headers";

const LoginPage = async () => {
    // server action for saving user data in a secure cookie
    const saveUserData = async (r: string) => {
        "use server";
        const cookiesStored = await cookies();
        cookiesStored.set("user", r, { httpOnly: true });
    };

    return <LoginForm saveUserData={saveUserData} />;
};

export default LoginPage;
