
"use client";

import Button from "@/componnet/Button";
import useCancelTicket from "@/hooks/useCancelTicket";
import { useGetTickets } from "@/hooks/useGetTicket";



export default function Page() {
    const {
        customers,
        setCustomers,
        loading,
        error: getTicketsError,
    } = useGetTickets();

    const {
        cancelTicket,
        error: cancelTicketError,
    } = useCancelTicket(setCustomers);

    const error = getTicketsError || cancelTicketError;

    return (
        <main className="min-h-screen bg-gray-100 p-6">
            <div className="mx-auto max-w-5xl">
                <div className="mb-6">
                    <h1 className="text-2xl font-semibold text-gray-900">
                        Waiting List
                    </h1>

                    <p className="mt-1 text-sm text-gray-500">
                        Manage customers currently waiting in the queue.
                    </p>
                </div>

                {error && (
                    <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-600">
                        {error}
                    </div>
                )}

                <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead className="border-b bg-gray-50">
                                <tr>
                                    <th className="px-6 py-4 font-medium text-gray-600">
                                        Ticket
                                    </th>

                                    <th className="px-6 py-4 font-medium text-gray-600">
                                        Name
                                    </th>

                                    <th className="px-6 py-4 font-medium text-gray-600">
                                        Party Size
                                    </th>

                                    <th className="px-6 py-4 font-medium text-gray-600">
                                        Status
                                    </th>

                                    <th className="px-6 py-4 text-right font-medium text-gray-600">
                                        Action
                                    </th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-gray-100">
                                {loading ? (
                                    <tr>
                                        <td
                                            colSpan={5}
                                            className="px-6 py-12 text-center text-sm text-gray-500"
                                        >
                                            Loading waiting list...
                                        </td>
                                    </tr>
                                ) : customers.length === 0 ? (
                                    <tr>
                                        <td
                                            colSpan={5}
                                            className="px-6 py-12 text-center text-sm text-gray-500"
                                        >
                                            No customers are currently
                                            waiting.
                                        </td>
                                    </tr>
                                ) : (
                                    customers.map((customer) => (
                                        <tr
                                            key={customer.ticket}
                                            className={
                                                customer.flag
                                                    ? "hover:bg-gray-50"
                                                    : "bg-green-50"
                                            }
                                        >
                                            <td className="px-6 py-4">
                                                <span className="font-semibold text-gray-900">
                                                    #{customer.ticket}
                                                </span>
                                            </td>

                                            <td className="px-6 py-4 text-gray-700">
                                                {customer.name}
                                            </td>

                                            <td className="px-6 py-4 text-gray-700">
                                                {customer.partySize}
                                            </td>

                                            <td className="px-6 py-4">
                                                {customer.flag ? (
                                                    <span className="rounded-full bg-yellow-50 px-2.5 py-1 text-xs font-medium text-yellow-700">
                                                        Waiting
                                                    </span>
                                                ) : (
                                                    <span className="rounded-full bg-green-100 px-2.5 py-1 text-xs font-medium text-green-700">
                                                        Cancelled
                                                    </span>
                                                )}
                                            </td>

                                            <td className="px-6 py-4 text-right">
                                                {customer.flag ? (
                                                    <Button
                                                        type="button"
                                                        className="border border-red-200 bg-red-50 px-3 py-1.5 text-sm font-medium text-red-600 hover:bg-red-100"
                                                        onClick={() =>
                                                            cancelTicket(
                                                                customer.ticket,
                                                            )
                                                        }
                                                    >
                                                        Cancel
                                                    </Button>
                                                ) : (
                                                    <span className="text-sm font-medium text-green-600">
                                                        Done
                                                    </span>
                                                )}
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </main>
    );
}
