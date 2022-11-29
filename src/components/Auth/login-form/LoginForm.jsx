import {useState} from "react";
import {useNavigate} from "react-router";
import {getLoggedUser} from "../../../utils/services/user-http-utils";
import {login} from "../../../utils/services/auth-http-utils";
import {Button, Form} from "react-bootstrap";
import {Link} from "react-router-dom";
import {useContext} from "react";
import {UserContext} from "../../../utils/contexts/UserContext";
import "./loginForm.scss";

export function LoginForm(){
    const navigate = useNavigate();
    const [user, setUser] = useState({
        email: '',
        password: ''
    });
    const {loggedUser, setLoggedUser} = useContext(UserContext);
    const [error, setError] = useState('');

    const onFormControlChange = (event) => {
        setUser((prevState) => ({
            ...prevState,
            [event.target.name]: event.target.value
        }));
    }

    const onSubmit = (event) => {
        event.preventDefault();
        login(user).then(() => {
            setLoggedUser(getLoggedUser());
            navigate('/profile');
        }).catch(error => setError(error.message));
    }

    return(
        <div className="login-form-wrapper container-fluid py-5 min-vh-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                    <Form onSubmit={onSubmit} className="my-4 card h-100 shadow-2-strong">
                        <h3 className="my-4">Login</h3>
                        <div>
                            {error && <span className="text-danger">{error}</span>}
                            <Form.Group className="mb-3 w-75 m-auto" controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" placeholder="Enter email" name="email" value={user.email} onChange={onFormControlChange} required />
                            </Form.Group>

                            <Form.Group className="mb-3 w-75 m-auto" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Enter password" name="password" value={user.password} onChange={onFormControlChange} required />
                            </Form.Group>

                            <Button variant="primary w-75 my-4" type="submit">
                                Login
                            </Button>

                            <div className="text-center my-2">
                                <p>Not a member? <Link to='/register'>Sign up</Link> </p>
                            </div>


                        </div>
                    </Form>
                </div>
            </div>
        </div>
    );
}

