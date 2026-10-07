
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
    name: z.string().trim().min(1, "Name is required"),
    partySize: z
        .number({
            error: "Party size is required",
        })
        .int("Party size must be a whole number")
        .gt(0, "Party size must be greater than 0"),
});

type FormValues = z.infer<typeof formSchema>;

export default function Page() {
    const router = useRouter();
    const [serverError, setServerError] = useState("");

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            partySize: 1,
        },
    });

    const onSubmit = async (data: FormValues) => {
        setServerError("");

        try {
            const response = await fetch(
                "http://localhost:3001/customer/join",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                },
            );

            if (!response.ok) {
                throw new Error("Failed to join the queue");
            }

            const result = await response.json();

           

            router.push(`/queue/${result.ticket}`);
        } catch (error) {
            console.log(error);

            setServerError(
                "Something went wrong. Please try again.",
            );
        }
    };

    return (
        <main className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
            <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-sm">
                <h1 className="mb-2 text-2xl font-semibold text-gray-900">
                    Join the Queue
                </h1>

                <p className="mb-6 text-sm text-gray-500">
                    Enter your details to join the waiting list.
                </p>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-5"
                >
                    {/* Name */}
                    <div>
                        <label
                            htmlFor="name"
                            className="mb-1.5 block text-sm font-medium text-gray-700"
                        >
                            Name
                        </label>

                        <input
                            id="name"
                            type="text"
                            placeholder="Enter your name"
                            {...register("name")}
                            className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        />

                        {errors.name && (
                            <p className="mt-1.5 text-sm text-red-500">
                                {errors.name.message}
                            </p>
                        )}
                    </div>

                    {/* Party Size */}
                    <div>
                        <label
                            htmlFor="partySize"
                            className="mb-1.5 block text-sm font-medium text-gray-700"
                        >
                            Party Size
                        </label>

                        <input
                            id="partySize"
                            type="number"
                            min={1}
                            {...register("partySize", {
                                valueAsNumber: true,
                            })}
                            className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        />

                        {errors.partySize && (
                            <p className="mt-1.5 text-sm text-red-500">
                                {errors.partySize.message}
                            </p>
                        )}
                    </div>

                    {/* Server Error */}
                    {serverError && (
                        <p className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
                            {serverError}
                        </p>
                    )}

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {isSubmitting ? "Joining..." : "Join Queue"}
                    </button>
                </form>
            </div>
        </main>
    );
}
