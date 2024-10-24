import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Image from 'next/image';
function RegButton(args) {
    const [modal, setModal] = useState(false);
    const [userInfo, setUserInfo] = useState([])
    const [loged,setLoged] = useState(false)
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
        e.preventDefault();
    
        try {
            const response = await fetch("http://localhost:3000/api/user/reg", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });
    
            if (!response.ok) throw new Error("Ошибка сети");
    
            const data = await response.json();
            setUserInfo((prevData) => [...prevData, data]);
            setLoged(true);
            console.log('Успешно');
        } catch (error) {
            console.error("Ошибка при отправке данных:", error);
        }
    };
    


    const toggle = () => setModal(!modal);

    return (
        <div>
            <Button color="danger" onClick={toggle}>
                Registration
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

            <ul>
          {userInfo.map((user, index) => (
            <li key={index}> {user.login} {user.password}</li> 
            
            
          ))}
            </ul>

        </div>
    );
}

export default RegButton;