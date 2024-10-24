import { Button } from "reactstrap";
import { useState, useEffect } from "react";
import Image from "next/image";
export default function Profile({ token }) {
    const [loged, setLoged] = useState(false);
    const [userData, setUserData] = useState(null); // Данные пользователя
    const [error, setError] = useState(null); // Для отображения ошибки, если есть


    const fetchUserData = async () => {
        try {
            const response = await fetch("http://localhost:3000/api/user/profile", {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,  // Отправляем токен в заголовке
                    "Content-Type": "application/json",
                },
            });
            
            if (!response.ok) {
                throw new Error('Ошибка при получении данных');
            }
            
            const data = await response.json();
            setUserData(data.user); // Сохраняем данные пользователя
            

        } catch (error) {
            setUserData(undefined)
            setError(error.message); // Сохраняем сообщение об ошибке
        }
    };

    return (
        <div>
            <Button onClick={fetchUserData}>Profile</Button>

            {userData ? (
                <div>
                    <Image
                        src={'/user.png'}
                        width={50}
                        height={50}
                        alt='1'
                    />
                    <h3>User Profile</h3>
                    <p>Login: {userData.login}</p>
                    <p>ID: {userData.id}</p>
                </div>
            ) : (
                <p>Log In</p>
            )}
        </div>
    )
}