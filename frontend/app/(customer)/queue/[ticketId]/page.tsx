
"use client";

import { useParams } from "next/navigation";
import useGetQueuePosition from "@/hooks/useGetQueuePosition";

export default function Page() {
    const params = useParams<{ ticketId: string }>();
    const ticketId = params.ticketId;

    const {
        queue,
        loading,
        error,
        getPosition,
    } = useGetQueuePosition(ticketId);

    if (loading) {
        return (
            <main className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
                <p className="text-sm text-gray-500">
                    Loading your queue position...
                </p>
            </main>
        );
    }

    if (error || !queue) {
        return (
            <main className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
                <div className="w-full max-w-md rounded-xl bg-white p-8 text-center shadow-sm">
                    <p className="text-red-500">
                        {error || "Ticket not found."}
                    </p>

                    <button
                        type="button"
                        onClick={getPosition}
                        className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                    >
                        Try Again
                    </button>
                </div>
            </main>
        );
    }

    return (
        <main className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
            <div className="w-full max-w-md rounded-xl bg-white p-8 text-center shadow-sm">
                <p className="text-sm font-medium text-gray-500">
                    You're in the queue
                </p>

                <div className="my-6">
                    <p className="text-sm text-gray-500">
                        Your ticket number
                    </p>

                    <h1 className="mt-2 text-6xl font-bold text-blue-600">
                        #{queue.ticket}
                    </h1>
                </div>

                <div className="rounded-lg bg-gray-50 p-5">
                    <p className="text-sm text-gray-500">
                        Tickets before you
                    </p>

                    <p className="mt-1 text-3xl font-semibold text-gray-900">
                        {queue.customersBefore}
                    </p>
                </div>

                <p className="mt-6 text-sm text-gray-500">
                    Please wait. We&apos;ll call your ticket when it&apos;s your
                    turn.
                </p>

                <button
                    type="button"
                    onClick={getPosition}
                    disabled={loading}
                    className="mt-6 w-full rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                    {loading ? "Refreshing..." : "Refresh Position"}
                </button>
            </div>
        </main>
    );
}
