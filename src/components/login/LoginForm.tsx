"use client";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { TbLoader } from "react-icons/tb";
import { useToast } from "@/hooks/UseToast";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/Form";

const phoneRegex = new RegExp(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/);

const formSchema = z.object({
    mobile: z.string({ required_error: "Fill your phone number please!" }).regex(phoneRegex, "Invalid phone number!"),
});

const LoginForm = ({ saveUserData }: { saveUserData: (r: string) => Promise<void> }) => {
    const { toast } = useToast();
    const router = useRouter();

    const [loading, setLoading] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            mobile: "",
        },
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        if (loading) return;
        setLoading(true);

        const data = {
            mobile: values.mobile,
        };

        const url = `https://randomuser.me/api?results=1&nat=us`;
        const R = await fetch(url, {
            method: "GET",
            // headers: { "content-type": "application/json" },
            // body: JSON.stringify(data),
        })
            .then((response) => response)
            .catch((error) => new Response(error, { status: 500, statusText: "Internal Error" }));
        setLoading(false);

        if (R.status >= 400 || !R.ok) {
            const error = await R.text();
            toast({ title: "Whoops...", description: error ?? "Unknow Error", variant: "destructive" });
            return;
        }

        const user = (await R.json()).results[0];
        await saveUserData(JSON.stringify(user));

        router.push("/dashboard");
    };

    return (
        <Card className="w-full max-w-96">
            <CardContent className="flex flex-col items-center gap-6 w-full p-8">
                <h1 className="text-3xl font-bold">Welcome</h1>
                <p className="text-sm opacity-75 -mb-2 text-pretty">Enter your phone number to login or register</p>
                <Form {...form}>
                    <form className="flex flex-col items-center gap-4 w-full" key="enter" onSubmit={form.handleSubmit(onSubmit)}>
                        <FormField
                            control={form.control}
                            name="mobile"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormControl>
                                        <Input placeholder="Phone Number" {...field} required />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button className="w-full py-6" type="submit" disabled={loading}>
                            {loading ? <TbLoader className="animate-spin" size="1.25rem" /> : "Continue"}
                        </Button>
                    </form>
                </Form>
                <small className="text-xs opacity-50 text-center">By signing up you accept our Terms Of Service and Privacy Policy</small>
            </CardContent>
        </Card>
    );
};

export default LoginForm;
