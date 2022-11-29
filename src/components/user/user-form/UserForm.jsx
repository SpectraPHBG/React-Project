import {useNavigate, useParams} from "react-router";
import {useEffect, useState} from "react";
import {Button, Form} from "react-bootstrap";
import {Link} from "react-router-dom";
import {getUserById, save} from "../../../utils/services/user-http-utils";

export function UserForm(){
    const emptyUser = {
        name: '',
        email: '',
        phone: '',
        password: ''
    };
    const [user, setUser] = useState(emptyUser);
    const [error, setError] = useState('');
    const [passwordRepeat, setPasswordRepeat] = useState('');
    const navigate = useNavigate();
    const params = useParams();

    useEffect(()=>{
        if(params.id){
            getUserById(params.id).then((response) => {
                setUser(response.data);
                setPasswordRepeat(response.data.password);
            })
        }
    },[params.id])

    const renderToLogin = () =>{
        if(!params.id){
            return <Link className="m-2" to='/login'>Already have an account?</Link>;
        }
    }

    const onInputChange = (event) => {
        setUser((prevState) => {
            return {
                ...prevState,
                [event.target.name]: event.target.value
            }
        });

        setError('');
    }

    const onRepeatPasswordChange = (event) => {
        if(event.target.name === "passwordRepeat"){
            setPasswordRepeat(event.target.value);
            return;
        }
        setError('');
    }

    const onFormSubmit = (event) => {
        event.preventDefault();
        if(user.password === passwordRepeat ) {
            save(user).then(() => {
                if(params.id){
                    navigate('/admin');
                }
                else{
                    navigate('/login');
                }
            })
                .catch(error => setError(error.message));
        }
        else{
            setError("Passwords do not match!");
        }
    }

    return (
        <div className="login-form-wrapper container-fluid py-5 min-vh-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                    <Form onSubmit={onFormSubmit} className="my-4 pb-4 card h-100 shadow-2-strong">
                        <h3 className="my-4">{params.id? "Edit" : "Register"}</h3>
                        <div>
                            {error && <span className="text-danger">{error}</span>}
                            <Form.Group className="mb-3 w-75 m-auto" controlId="formBasicName">
                                <Form.Label>Full Name</Form.Label>
                                <Form.Control type="text" placeholder="Enter full name" name="name" value={user.name} onChange={onInputChange} required />
                            </Form.Group>

                            <Form.Group className="mb-3 w-75 m-auto" controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" placeholder="Enter email" name="email" value={user.email} onChange={onInputChange} required />
                            </Form.Group>

                            <Form.Group className="mb-3 w-75 m-auto" controlId="formBasicPhone">
                                <Form.Label>Phone</Form.Label>
                                <Form.Control type="tel" placeholder="Enter phone" name="phone" value={user.phone} onChange={onInputChange} required />
                            </Form.Group>

                            <Form.Group className="mb-3 w-75 m-auto" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Enter password" name="password" value={user.password} onChange={onInputChange} required />
                            </Form.Group>

                            <Form.Group className="mb-3 w-75 m-auto" controlId="formBasicPasswordRepeat">
                                <Form.Label>Repeat Password</Form.Label>
                                <Form.Control type="password" placeholder="Repeat password" name="passwordRepeat" value={passwordRepeat} onChange={onRepeatPasswordChange} required />
                            </Form.Group>

                            <Button variant="primary" type="submit">
                                {params.id? "Edit" : "Register"}
                            </Button>

                            {renderToLogin()}
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    );
}
