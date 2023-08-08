import React, { useState, useEffect } from 'react';
import './Clients.css';

interface Client {
  id: number;
  name: string;
  email: string;
}

function Clients() {
  const [clients, setClients] = useState<Client[]>([]);
  const [error, setError] = useState<Error | null>(null); // Adjusted the type to Error

  useEffect(() => {
    async function fetchClients() {
      try {
        const response = await fetch('/clients', {
          headers: {
            Accept: 'application/json'
          }
        });
    
        if (!response.ok) {
          console.error('Response status:', response.status);
          console.error('Response headers:', response.headers);
          const errorData = await response.json();
          console.error('Error data:', errorData);
          const errorMessage = errorData.message || 'Failed to fetch client data';
          throw new Error(`HTTP error: ${response.status} - ${errorMessage}`);
        }
    
        if (response.headers.get('Content-Type')?.includes('application/json')) {
          const body: Client[] = await response.json();
          setClients(body);
        } else {
          throw new Error('Response is not JSON');
        }
      } catch (error) {
        setError(new Error(`An error occurred while fetching client data: ${(error as Error).message}`));
      }
    }

    fetchClients();
  }, []);

  return (
    <div className="Clients">
      <h2>Clients</h2>
      {error ? (
        <div className="error-message">{error.message}</div>
      ) : (
        clients.map(client => (
          <div key={client.id}>
            {client.name} ({client.email})
          </div>
        ))
      )}
    </div>
  );
}

export default Clients;
