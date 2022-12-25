import { Link, useLocation, useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Helmet } from 'react-helmet-async';
import Axios from 'axios'
import { useContext, useEffect, useState } from 'react';
import { Store } from '../Store'
import { toast } from 'react-toastify';
import { getError } from '../utils';

export default function SignupScreen() {
    
    const navigate = useNavigate() // redirect

    // Set context
    const { state, dispatch: ctxDispatch } = useContext(Store)
    const { userInfo } = state;

    // Submit form handler
    const handleSubmit = async (e) => {
        
    }
    // restrict logged in user to access signin page

    return (
        <Container className="small-container">
            <Helmet>
                <title>Sign Up</title>
            </Helmet>
            <h1 className="my-3">Sign Up</h1>
            <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="string" required  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" required  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" required />
                </Form.Group>
                <div className="mb-3">
                    <Button type="submit">Sign In</Button>
                </div>
                <div className="mb-3">
                    New customer?{' '}
                    <Link to={'/signup'}>Create your account</Link>
                </div>
            </Form>
        </Container>
    );
}