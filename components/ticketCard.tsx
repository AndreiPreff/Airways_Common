import { useDispatch } from "react-redux";

import { Button, Card, CardContent, Typography } from "@mui/material";
import { Ticket, TicketCardProps } from "app/flights/types/ticket-dto.type";
import { selectTicket } from "app/flights/store/flights.slice";



const TicketCard: React.FC<TicketCardProps> = ({ tickets, ticketType, admin }) => {
    const dispatch = useDispatch();
    const handleSelectTicket = (ticket:Ticket[]) => {
      dispatch(selectTicket({ ticketType, ticket }));
    };
    return (
      <div>
        
        {tickets.map((flight, index) => (
          <Card key={index}>
            <CardContent>
              <Typography variant="h5" component="div">
                Flight from {flight[0].from} to {flight[flight.length - 1].to}
              </Typography>
              <Typography color="text.secondary">
                Stops: {flight.length - 1}
              </Typography>
              {flight.map((ticket, ticketIndex) => (
                <div key={ticketIndex}>
                  <Typography color="text.secondary">
                    Departure Time: {ticket.departure_time}
                  </Typography>
                  <Typography color="text.secondary">
                    Arrival Time: {ticket.arrival_time}
                  </Typography>
                  <Typography color="text.secondary">
                    Price: ${ticket.price}
                  </Typography>
                  {ticketIndex < flight.length - 1 && (
                    <Typography color="text.secondary">
                      Transfer in: {ticket.to}
                    </Typography>
                  )}
                </div>
              ))}
             {!admin&& <Button onClick={() => handleSelectTicket(flight)} variant="contained" color="primary">
                Select
              </Button>}
            </CardContent>
          </Card>
        ))}
      </div>
    );
  };

  export default TicketCard;