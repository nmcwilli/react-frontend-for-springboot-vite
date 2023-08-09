import React, { Component, ChangeEvent, FormEvent } from 'react';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
// import AppNavbar from './AppNavbar';

interface Client {
    name: string;
    email: string;
}

interface ClientEditState {
    item: Client;
}

class ClientEdit extends Component<RouteComponentProps, ClientEditState> {

    emptyItem: Client = {
        name: '',
        email: ''
    };

    constructor(props: RouteComponentProps) {
        super(props);
        this.state = {
            item: this.emptyItem
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async componentDidMount() {
        if (this.props.match.params.id !== 'new') {
            try {
                const response = await fetch(`/clients/${this.props.match.params.id}`);
                
                if (!response.ok) {
                    console.error('Failed to fetch client:', response.status, response.statusText);
                    // Handle error case if needed
                    return;
                }
                
                const client = await response.json();
                this.setState({ item: client });
            } catch (error) {
                console.error('An error occurred while fetching the client:', error.message);
                // Handle error case if needed
            }
        }
    }    

    handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let item = { ...this.state.item, [name]: value };
        this.setState({ item });
    }
    

    async handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const { item } = this.state;
    
        try {
            const response = await fetch('/clients' + (item.id ? '/' + item.id : ''), {
                method: item.id ? 'PUT' : 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(item),
            });
    
            if (!response.ok) {
                console.error('Failed to save client:', response.status, response.statusText);
                // Handle error case if needed
                return;
            }
    
            this.props.history.push('/clients');
        } catch (error) {
            console.error('An error occurred while saving the client:', error.message);
            // Handle error case if needed
        }
    }    

    render() {
        const { item } = this.state;
        const title = <h2>{item.id ? 'Edit Client' : 'Add Client'}</h2>;
    
        return (
            <div>
                <AppNavbar />
                <Container>
                    {title}
                    <Form onSubmit={this.handleSubmit}>
                        <FormGroup>
                            <Label for="name">Name</Label>
                            <Input
                                type="text"
                                name="name"
                                id="name"
                                value={item.name || ''}
                                onChange={this.handleChange}
                                autoComplete="name"
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="email">Email</Label>
                            <Input
                                type="text"
                                name="email"
                                id="email"
                                value={item.email || ''}
                                onChange={this.handleChange}
                                autoComplete="email"
                            />
                        </FormGroup>
                        <FormGroup>
                            <Button color="primary" type="submit">Save</Button>{' '}
                            <Button color="secondary" tag={Link} to="/clients">Cancel</Button>
                        </FormGroup>
                    </Form>
                </Container>
            </div>
        );
    }    
}

export default withRouter(ClientEdit);
