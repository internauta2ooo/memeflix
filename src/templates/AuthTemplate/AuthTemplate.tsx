import { Row, Col } from 'antd';
import './AuthTemplate.css';
import imagen from './DacodesLogo.png';
import amazon from './amazon.svg';
import efy from './efy.svg';
import bptcode from './BestPlaceToCode.png';
import gptw from './gptw.png';
import login from './login.png';

interface IAuthTemplate {
    children: React.ReactNode
}
const AuthTemplate = ({ children }: IAuthTemplate) => {
    return (
        <div>
            <Row className="navbar">
                <Col span={21} offset={1}>

                    <div>
                        <img src={imagen} alt="Descripción de la imagen" />
                    </div>
                </Col>
                <Col span={1}>

                    <div>
                        <img src={login} alt="Descripción de la imagen" />
                    </div>
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                    {children}
                </Col>
            </Row>
            <Row className='footer'>
                <Col span={20}>
                    <Row>
                        <Col span={24} className='resume'>
                            <div className='slogan'>
                                We are coding the world of tomorrow_
                            </div>
                            <div className='slogan-two'>
                                DaCodes es una de las mejores empresas de desarrollo de software en México y LATAM. Lo que nos separa de los demás es el nivel de involucramiento que tenemos en nuestros proyectos y la pasión que tenemos por desarrollar productos digitales de calidad mundial. Somos un equipo de 220+ dacoders especializados en la planeación, diseño, desarrollo, implementación e innovación continua de productos digitales disruptivos.
                            </div>
                            <div>
                                <Row className='certifications'>
                                    <Col>
                                        <img src={bptcode} alt="Descripción de la imagen" />
                                    </Col>
                                    <Col>
                                        <img src={gptw} alt="Descripción de la imagen" />
                                    </Col>
                                    <Col>
                                        <img src={efy} alt="Descripción de la imagen" />
                                    </Col>
                                    <Col>
                                        <img src={amazon} alt="Descripción de la imagen" />
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                    </Row>
                </Col>
                <Col span={4}>
                </Col>
            </Row>
        </div>
    );
}

export default AuthTemplate;