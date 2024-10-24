import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Image from 'next/image';
import Profile from '../profile/profile';

function LoginButton(args) {
    const [modal, setModal] = useState(false);
    const [userInfo, setUserInfo] = useState([])
    const [loged, setLoged] = useState(false)
    const [formData, setFormData] = useState({
        login: "",
        password: "",   
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
        console.log(formData);
    };
    const handleSubmit = async (e) => {
        try {
            const response = await fetch("http://localhost:3000/api/user", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error("Ошибка сети или сервера");
            }

            const data = await response.json();
            localStorage.setItem('token', data.token); // Сохранение токена в localStorage
            setUserInfo((prevData) => ([
                ...prevData,
                data
            ]));

            console.log(userInfo);
            console.log("Welcome", data);
            setLoged(true);
        } catch (error) {
            console.error("Ошибка при отправке данных:", error);
        }
    };



    const toggle = () => setModal(!modal);

    return (
        <div>
            <Button color="danger" onClick={toggle}>
                Log in
            </Button>
            <Modal isOpen={modal} toggle={toggle} {...args}>
                <ModalHeader toggle={toggle}>Registration</ModalHeader>
                <ModalBody>
                    <form onSubmit={handleSubmit}>

                        <input
                            name="login"
                            placeholder="Login"
                            value={formData.login}
                            onChange={handleChange}
                        ></input>
                        <input
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                        ></input>
                        <Button color="primary" type='submit' onClick={toggle}>
                            Log in
                        </Button>
                    </form>
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={toggle}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
            {
                loged ? (
                    
                        <ul>
                            {userInfo.map((user, index) => (
                                <li key={index}>
                                    {/* <Profile token={localStorage.getItem('token')}/> */}
                                </li>
                            ))}
                        </ul>
                    )
                      
                 : (
                    <h1>Reg or Auth</h1>
                )
            }
        </div>
    );
}

export default LoginButton;