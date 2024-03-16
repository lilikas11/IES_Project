import React, { useState, useEffect } from 'react';
import Card from '../components/ticket_cards';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function MyTickets() {
  const [ticketData, setTicketData] = useState(null);
  const [eventData, setEventData] = useState([]);
  const userId = localStorage.getItem("user_id");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(import.meta.env.VITE_API_URL+`/tickets/${userId}`);
        setTicketData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching ticket data:', error);
      }
    };

    fetchData();
  }, [userId]);

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        if (ticketData && ticketData.length > 0) {
          const eventIds = ticketData.map(ticket => ticket.event_id);
          const eventResponses = await Promise.all(
            eventIds.map(eventId => axios.get(import.meta.env.VITE_API_URL+`/events/${eventId}`))
          );
          setEventData(eventResponses.map(response => response.data));
        }
      } catch (error) {
        console.error('Error fetching event data:', error);
      }
    };

    fetchEventData();
  }, [ticketData]);

  useEffect(() => {
    if (ticketData) {
      console.log(ticketData);
    }
  }, [ticketData]);

  if (!ticketData) {
    return <div>You Don't Have Tickets...</div>;
  }

  return (
    <div className="p-10 space-y-10">
      <div className=" space-y-2">
        <p className="mt-10 mb-20 font-poppins text-[#a7c7eb] font-bold text-4xl">Os Meus Bilhetes:</p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '20px' }}>
        {eventData.map((item, index) => (
          <Card
            key={index}
            title={item.name}
            data={item.datestart}
            hora={item.schedule}
            city={item.city}
            location={item.location}
            price={item.prices}
          />
        ))}
      </div>
    </div>
  );
}

export default MyTickets;
