import { useState } from "react";
import { Button, Checkbox, Col, Input, Row } from "antd";
import AuthTemplate from "../../../templates/AuthTemplate/AuthTemplate";
import './AuthLogin.css';
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AuthLogin = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [checked, setChecked] = useState(false);

    const isFormValid = () => {
        return (
            email.trim() !== "" &&
            password.trim() !== "" &&
            password.length >= 7 &&
            checked &&
            isEmailValid()
        );
    };

    const isEmailValid = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleEmailChange = (e: any) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e: any) => {
        setPassword(e.target.value);
    };

    const handleCheckboxChange = (e: any) => {
        setChecked(e.target.checked);
    };

    const handleCreateAccount = async () => {
        if (!isFormValid()) {
            return;
        }
        const url = 'https://api.themoviedb.org/3/authentication/guest_session/new';
        const headers = {
            Authorization:
                'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1N2VjNjhmM2Q4ODFlZDM2OWU3MjcxZTUwNTkwNzE5ZSIsInN1YiI6IjY0Y2QzM2MxMWIxNTdkMDBmZmM1Y2IyOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4ePv27fS4QxnrzVTdpL5YDis1zqI-qa4G2AJ678sS_c',
            accept: 'application/json',
        };

        try {
            const response = await axios.get(url, { headers });
            const token = response.data.guest_session_id;
            localStorage.setItem('guest_token', token);
            console.log("Guest Session:", response.data);
            navigate("/movies");
        } catch (error) {
            console.error('Error al obtener datos:', error);
        }
    };

    return (
        <AuthTemplate>
            <div className="container-login">
                <Row>
                    <Col span={16} className="login-form">
                        <h1>Login</h1>
                        <p>Bienvenido</p>
                        <div className="resize">
                            <label htmlFor="email">Correo electrónico</label>
                            <Input className="margin-top" id="email" placeholder="Correo electrónico" value={email} onChange={handleEmailChange} />
                            {email.trim() !== "" && !isEmailValid() && <p style={{ color: "red" }}>Correo electrónico inválido</p>}

                            <label htmlFor="password">Contraseña</label>
                            <Input.Password className="margin-top" id="password" placeholder="Contraseña" value={password} onChange={handlePasswordChange} />
                        </div>
                        <Checkbox className="margin-top" checked={checked} onChange={handleCheckboxChange}>Acepto los términos y condiciones</Checkbox>
                        <div className="margin-top">
                            <Button type="primary" onClick={handleCreateAccount} disabled={!isFormValid()}>
                                Crear Cuenta
                            </Button>
                        </div>

                    </Col>
                </Row>
            </div>
        </AuthTemplate>
    );
};

export default AuthLogin;
