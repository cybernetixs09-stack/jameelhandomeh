
import { useCallback, useEffect, useState } from "react";

export type QueuePosition = {
    ticket: number;
    customersBefore: number;
};

export default function useGetQueuePosition(ticketId: string) {
    const [queue, setQueue] = useState<QueuePosition | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const getPosition = useCallback(async () => {
        if (!ticketId) {
            return;
        }

        try {
            setLoading(true);
            setError("");

            const response = await fetch(
                `http://localhost:3001/customer/${ticketId}/position`,
            );

            if (!response.ok) {
                throw new Error("Ticket not found");
            }

            const data: QueuePosition = await response.json();

            setQueue(data);
        } catch (error) {
            console.error(error);
            setError("Unable to get your queue position.");
        } finally {
            setLoading(false);
        }
    }, [ticketId]);

    useEffect(() => {
        getPosition();
    }, [getPosition]);

    return {
        queue,
        loading,
        error,
        getPosition,
    };
}
