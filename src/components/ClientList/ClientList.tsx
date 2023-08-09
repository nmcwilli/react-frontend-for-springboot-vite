import { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import './ClientList.css';
import { Link } from 'react-router-dom';

/* tslint:disable:no-unused-variable */
interface Client {
    id: number;
    // Add other properties here
}

interface ClientListState {
    clients: Client[];
}

class ClientList extends Component<Record<string, never>, ClientListState> {

    constructor(props: Record<string, never>) {
        super(props);
        this.state = { clients: [] };
    }

    componentDidMount() {
        fetch('/clients')
            .then(response => response.json())
            .then((data: Client[]) => this.setState({ clients: data }));
    }

    async remove(id: number) {
        try {
            const response = await fetch(`/clients/${id}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });
    
            if (!response.ok) {
                console.error('Failed to delete client:', response.status, response.statusText);
                // Handle error case if needed
                return;
            }
    
            const updatedClients = this.state.clients.filter(i => i.id !== id);
            this.setState({ clients: updatedClients });
        } catch (error) {
            console.error('An error occurred while deleting the client:', error.message);
            // Handle error case if needed
        }
    }    

    render() {
        const { clients, isLoading } = this.state;
    
        if (isLoading) {
            return <p>Loading...</p>;
        }
    
        const clientList = clients.map(client => (
            <tr key={client.id}>
                <td style={{ whiteSpace: 'nowrap' }}>{client.name}</td>
                <td>{client.email}</td>
                <td>
                    <ButtonGroup>
                        <Button size="sm" color="primary" tag={Link} to={"/clients/" + client.id}>Edit</Button>
                        <Button size="sm" color="danger" onClick={() => this.remove(client.id)}>Delete</Button>
                    </ButtonGroup>
                </td>
            </tr>
        ));
    
        return (
            <div>
                
                <Container fluid>
                    <div className="float-right">
                        <Button color="success" tag={Link} to="/clients/new">Add Client</Button>
                    </div>
                    <h3>Clients</h3>
                    <Table className="mt-4">
                        <thead>
                        <tr>
                            <th width="30%">Name</th>
                            <th width="30%">Email</th>
                            <th width="40%">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {clientList}
                        </tbody>
                    </Table>
                </Container>
            </div>
        );
    }    
}

export default ClientList;
