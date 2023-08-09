import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from '../AppNavbar/AppNavbar';
import { Link } from 'react-router-dom';

interface Client {
  id: number;
  name: string;
  email: string;
}

interface ClientListState {
  clients: Client[];
}

class ClientList extends Component<Record<string, never>, ClientListState> {
  constructor(props: Record<string, never>) {
    super(props);
    this.state = { clients: [] };
    this.remove = this.remove.bind(this);
  }

  componentDidMount() {
    fetch('/clients')
      .then((response) => response.json())
      .then((data: Client[]) => this.setState({ clients: data }));
  }

  async remove(id: number): Promise<void> {
    await fetch(`/clients/${id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    }).then(() => {
      const updatedClients = this.state.clients.filter((i) => i.id !== id);
      this.setState({ clients: updatedClients });
    });
  }

  render(): JSX.Element {
    const { clients } = this.state;

    const clientList = clients.map((client) => (
      <tr key={client.id}>
        <td style={{ whiteSpace: 'nowrap' }}>{client.name}</td>
        <td>{client.email}</td>
        <td>
          <ButtonGroup>
            <Button
              size="sm"
              color="primary"
              tag={Link}
              to={`/clients/${client.id}`}
            >
              Edit
            </Button>
            <Button
              size="sm"
              color="danger"
              onClick={() => this.remove(client.id)}
            >
              Delete
            </Button>
          </ButtonGroup>
        </td>
      </tr>
    ));

    return (
      <div>
        <AppNavbar />
        <Container fluid>
          <div className="float-right">
            <Button color="success" tag={Link} to="/clients/new">
              Add Client
            </Button>
          </div>
          <h3>Clients</h3>
          <Table className="mt-4">
            <thead>
              <tr>
                <th className="th-width-small">Name</th>
                <th className="th-width-med">Email</th>
                <th className="th-width-large">Actions</th>
              </tr>
            </thead>
            <tbody>{clientList}</tbody>
          </Table>
        </Container>
      </div>
    );
  }
}

export default ClientList;
