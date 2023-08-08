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

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    remove(id: number) {
        // Implement your remove logic here
    }

    render() {
        const { clients } = this.state;

        const clientList = clients.map((client) => (
            <tr key={client.id}>
                <td>{client.id}</td>
                {/* Render other properties of the client */}
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
                    <h3>Client List</h3>
                    <Table className="mt-4">
                        <thead>
                            <tr>
                                <th className="th-width-small">ID</th>
                                {/* Add table headers for other properties */}
                                <th className="th-width-med">Actions</th>
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
