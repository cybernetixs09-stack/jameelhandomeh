
import { useState } from "react";

type Customer = {
    ticket: number;
    name: string;
    partySize: number;
    flag: boolean;
};

export default function useCancelTicket(
    setCustomers: React.Dispatch<React.SetStateAction<Customer[]>>,
) {
    const [error, setError] = useState("");

    const cancelTicket = async (ticket: number) => {
        try {
            setError("");

            const response = await fetch(
                `http://localhost:3001/staff/tickets/${ticket}`,
                {
                    method: "DELETE",
                },
            );

            if (!response.ok) {
                throw new Error("Failed to cancel ticket");
            }

            setCustomers((currentCustomers) =>
                currentCustomers.map((customer) =>
                    customer.ticket === ticket
                        ? {
                              ...customer,
                              flag: false,
                          }
                        : customer,
                ),
            );
        } catch (error) {
            console.error(error);
            setError("Unable to cancel the ticket.");
        }
    };

    return {
        cancelTicket,
        error,
    };
}
