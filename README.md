Chat Requests Log

1. Waiting List Project
- Build a waiting-list/queue system.
- Frontend: Next.js.
- Backend: NestJS.
- Database: Prisma + PostgreSQL.
2. Main Requirements
- Customer enters name and party size.
- Customer receives a unique ticket number.
- Customer can see how many parties are ahead.
- Refreshing the queue page updates the number ahead.
- Staff can see waiting parties in join order.
- Staff can remove/cancel any party.
- Name cannot be empty.
- Party size must be a whole number greater than 0.
- Ticket numbers must be unique and never reused.
- Parties ahead means parties, not individual people.
3. Prisma WaitingParty Model
- Create a WaitingParty model with id, ticket, name, partySize, createdAt.
- Add a boolean flag to represent whether the party is still waiting.
- The chosen flag name is flag.
4. Customer Join Form
- Build a customer form using React Hook Form and Zod.
- Fields: name and partySize.
- Validate the input.
- Submit to POST /customer/join.
- Receive the ticket number.
- Redirect the customer to /queue/[ticketId].
5. Customer DTO
- Create a NestJS DTO for name and partySize.
- Use class-validator.
- Validate name and party size.
6. Customer Controller
- Add POST /customer/join.
- Add GET /customer/:ticket/position.
7. Customer Service
- Create a new waiting party.
- Generate a unique ticket.
- Set flag: true.
- Return the ticket number.
- Find a customer's queue position.
- Count active parties before that customer.
8. Customer Queue Page
- Create /queue/[ticketId].
- Use useParams() to get the ticket ID.
- Display ticket number.
- Display number of parties before the customer.
- Add loading state.
- Add error state.
- Add refresh button.
9. Reusable Button
- Create a reusable Button component.
- Support className.
- Support onClick.
- Support type.
- Support children and normal button props.
10. Staff Dashboard
- Create a staff waiting-list dashboard.
- Display a table with:
  - Ticket
  - Name
  - Party Size
  - Status
  - Action
- Waiting rows have a waiting status.
- Cancelled rows have a cancelled status.
11. Staff Controller/API
- Add GET /staff/tickets to get tickets.
- Add DELETE /staff/tickets/:ticket to cancel a ticket.
12. Staff Service
- Get tickets from Prisma.
- Cancel a ticket by changing its flag instead of deleting the database record.
13. Change isActive to flag
- Replace isActive with flag everywhere in the frontend.
- flag: true means Waiting.
- flag: false means Cancelled.
14. Staff Cancel Behavior
When Cancel is clicked:
- Send DELETE request.
- Keep the row visible.
- Change flag to false locally.
- Change the row appearance to green.
- Show Cancelled status.
- Replace Cancel button with Done.
15. Separate Staff Business Logic
Create custom hooks:
- useGetTickets
- useCancelTicket
useGetTickets handles:
- API request.
- Customers state.
- Loading.
- Error.
useCancelTicket handles:
- DELETE request.
- Updating the selected customer's flag.
- Cancel error.
16. Separate Customer Queue Business Logic
Create:
- useGetQueuePosition(ticketId)
The hook handles:
- API request.
- Queue state.
- Loading.
- Error.
- Refresh function.
The queue page handles the UI only.
17. Current API Routes
Customer
- POST /customer/join
- GET /customer/:ticket/position
Staff
- GET /staff/tickets
- DELETE /staff/tickets/:ticket
18. Ticket Rules
- Ticket numbers are unique.
- Ticket numbers are never reused after cancellation.
- Do not calculate a new ticket from the current number of waiting parties.
- Ticket generation should eventually be made concurrency-safe using a database sequence/counter if needed.
19. Queue Position Rule
customersBefore means the number of waiting parties before the current customer, not the number of people.
20. Frontend Stack
- Next.js
- React
- TypeScript
- Tailwind CSS
- React Hook Form
- Zod
21. Backend Stack
- NestJS
- Prisma
- PostgreSQL
- class-validator
End of Chat Requests