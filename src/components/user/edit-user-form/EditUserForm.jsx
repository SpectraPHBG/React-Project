import {Button, Form} from "react-bootstrap";
import {useNavigate, useParams} from "react-router";
import {useEffect, useState} from "react";
import {getUserById, save} from "../../../utils/services/user-http-utils";

export function EditUserForm(){
    const emptyUser = {
        id:'',
        name: '',
        email: '',
        phone: '',
        password:''
    };
    const navigate = useNavigate();
    const [user, setUser] = useState(emptyUser);
    const [error, setError] = useState('');
    const params = useParams();

    useEffect(() => {
        if (params.id) {
            getUserById(params.id)
                .then((response) => {
                    setUser(response.data);
                })
        } else {
            setUser(emptyUser);
        }
    }, [params.id]);

    const onInputChange = (event) => {
        setUser((prevState) => {
            return {
                ...prevState,
                [event.target.name]: event.target.value
            }
        });

        setError('');
    }

    const onFormSubmit = (event) => {
        event.preventDefault();
        save(user).then(() => {
            navigate('/profile');
        })
            .catch(error => setError(error.message));
    }

    return (
        <div className="login-form-wrapper container-fluid py-5 min-vh-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                    <Form onSubmit={onFormSubmit} className="my-4 pb-4 card h-100 shadow-2-strong">
                        <h3 className="my-4">Edit User</h3>
                        <div>
                            {error && <span className="text-danger">{error}</span>}
                            <Form.Group className="mb-3 w-75 m-auto" controlId="formBasicName">
                                <Form.Label>Full Name</Form.Label>
                                <Form.Control type="text" placeholder="Enter full name" name="name" value={user.name} onChange={onInputChange} required />
                            </Form.Group>

                            <Form.Group className="mb-3 w-75 m-auto" controlId="formBasicPhone">
                                <Form.Label>Phone</Form.Label>
                                <Form.Control type="tel" placeholder="Enter phone" name="phone" value={user.phone} onChange={onInputChange} required />
                            </Form.Group>

                            <Button variant="primary w-75 my-4" type="submit">
                                Submit
                            </Button>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    );
}
