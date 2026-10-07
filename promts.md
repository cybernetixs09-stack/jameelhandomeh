1) I have a waitnglist system.
I want to build a website using Next.js, NestJS, and Prisma.
The core concept is a system that allows customers to join the queue and check their position via the website.
I also need a staff dashboard that displays all the groups.
That is the basic idea; there are further details to cover.

2) i want to make the structre of folder then i will give you the specific req

3) export default function  page() {
    return (
        <div>
             
        </div>
    );
} make to this page with zod and react hook form with name is req and party size is grater than 0

4) use tailwind with simple style

5) export default function page(){
    return (
        <div></div>
    );
} this is a dashboard for staff to display all customer with their name and size of party and a the number of tikect i need you to make it in table and add action col for cancel the party

6) make to me a reusble comp for button that can me pass it classname and handle function and type

7) now make to me a page that appear the number of ticket and the number of ticket before me  this page appear after the customer click the button of the join page

8) // This is your Prisma schema file,
// learn more about it in the docs: https://pris.ly/d/prisma-schema

// Get a free hosted Postgres database in seconds: `npx create-db`

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
}

 write to me the schema with this note 
Core criteria (Definition of Done)
1. A customer joins the waitlist by entering their name and party size, and receives a ticket number.
2. The customer can see how many parties are ahead of them. When a party ahead of them leaves the list, the customer sees the new number after refreshing the page.
3. Staff see the waiting parties in the order they joined, and can remove any party from the list.
Three rules (so that nobody loses time on different assumptions)
- The name cannot be empty, and the party size is a whole number greater than zero.
- Every ticket number is unique and is never reused after a party is removed.
- "Parties ahead" means the waiting parties before you, not the number of people.


9) import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StaffService } from './staff.service';
import { CreateStaffDto } from './dto/create-staff.dto';
import { UpdateStaffDto } from './dto/update-staff.dto';

@Controller('staff')
export class StaffController {
  constructor(private readonly staffService: StaffService) {}

  
}
 make this http method:

1) get all ticket 
2) cancel ticket  ( i add flag varible to waiting list model dont worry)


10) i want you to make to me dto with class validator to name and size of party

11) import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

 
}

make this  to create join ( the respone is ticket number , the ticket number is uniqe) 
get the number of customer before me

12) "use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
    name: z.string().min(1, "Name is required"),
    partySize: z
        .number({
            error: "Party size is required",
        })
        .int("Party size must be a whole number")
        .gt(0, "Party size must be greater than 0"),
});

type FormValues = z.infer<typeof formSchema>;

export default function Page() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            partySize: 1,
        },
    });

    const onSubmit = (data: FormValues) => {
        console.log(data);
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

                    {/* Submit */}
                    <button
                        type="submit"
                        className="w-full rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                        Join Queue
                    </button>
                </form>
            </div>
        </main>
    );
}
 handle it with join api

 13) import { useParams } from "next/navigation";

export default function Page() {
   

    let {tikcetId}=useParams();

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
                        #{ticketNumber}
                    </h1>
                </div>

                <div className="rounded-lg bg-gray-50 p-5">
                    <p className="text-sm text-gray-500">
                        Tickets before you
                    </p>

                    <p className="mt-1 text-3xl font-semibold text-gray-900">
                        {ticketsBefore}
                    </p>
                </div>

                <p className="mt-6 text-sm text-gray-500">
                    Please wait. We&apos;ll call your ticket when it&apos;s your
                    turn.
                </p>
            </div>
        </main>
    );
}
 make this also

 14)  const [customers, setCustomers] = useState<Customer[]>([]);
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

    const cancelTicket = async (ticket: number) => {
        try {
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
    
     sperate into custom hook useGetticket and cancel ticket

     

