import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import AppNavbar from '../AppNavbar/AppNavbar';

class AppError extends Error {
    constructor(message: string, public status?: number) {
        super(message);
        this.name = 'AppError';
    }
}

interface Client {
    id?: string;
    name: string;
    email: string;
}

const ClientEdit: React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();

    const [item, setItem] = useState<Client>({ name: '', email: '' });

    const fetchClient = async () => {
        try {
            const response = await fetch(`/api/v1/clients/${id}`);
            
            if (!response.ok) {
                throw new AppError(`Failed to fetch client: ${response.statusText}`, response.status);
            }
            
            const client = await response.json();
            setItem(client);
        } catch (error) {
            if (error instanceof AppError) {
                console.error('An error occurred while fetching the client:', error.message);
                // Handle error case if needed
            } else {
                console.error('An unexpected error occurred:', error);
            }
        }
    };

    useEffect(() => {
        if (id !== 'new') {
            fetchClient();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]); // Include 'id' in the dependency array

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setItem(prevItem => ({ ...prevItem, [name]: value }));
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            const response = await fetch('/api/clients' + (item.id ? '/' + item.id : ''), {
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

            navigate('/clients');
        } catch (error) {
            console.error('An error occurred while saving the client:');
            // Handle error case if needed
        }
    };

    const title = <h2>{item.id ? 'Edit Client' : 'Add Client'}</h2>;

    return (
        <div>
            <AppNavbar />
            <Container>
                {title}
                <Form onSubmit={handleSubmit}>
                    <FormGroup>
                        <Label for="name">Name</Label>
                        <Input
                            type="text"
                            name="name"
                            id="name"
                            value={item.name || ''}
                            onChange={handleChange}
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
                            onChange={handleChange}
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
};

export default ClientEdit;
