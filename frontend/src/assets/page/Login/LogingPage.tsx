import _React from 'react';
import LoginPageForm from '#src/assets/componets/LoginComponents/LoginForm/LoginPageForm';
import LoginPageImg from  '#src/assets/componets/LoginComponents/LoginPageImg/LoginPageImg'
import './LoginPageStyles.css'

function LogingPage() {
    return (
        <div className="LoginComponents">
            <div className="ImgComponent">
                <LoginPageImg/>
            </div>
            <div className="FormComponent">
                <LoginPageForm />
            </div>
        </div>
    );
}

export default LogingPage;