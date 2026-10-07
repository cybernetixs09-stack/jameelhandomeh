
import { useCallback, useEffect, useState } from "react";

type Customer = {
    ticket: number;
    name: string;
    partySize: number;
    flag: boolean;
};

export  function useGetTickets() {
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const getTickets = useCallback(async () => {
        try {
            setLoading(true);
            setError("");

            const response = await fetch(
                "http://localhost:3001/staff/tickets",
            );

            if (!response.ok) {
                throw new Error("Failed to get tickets");
            }

            const data: Customer[] = await response.json();

            setCustomers(data);
        } catch (error) {
            console.error(error);
            setError("Unable to load the waiting list.");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        getTickets();
    }, [getTickets]);

    return {
        customers,
        setCustomers,
        loading,
        error,
        getTickets,
    };
}
