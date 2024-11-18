import _React from 'react';
import './LoginPageStyles.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginPageForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const navigate = useNavigate();

  const handleLogin = (event: React.FormEvent) => {
    event.preventDefault();

    console.log('Usuario:', username);
    console.log('Contraseña:', password);
    console.log('Recuérdame:', rememberMe);

    navigate('/Home');
  };

  return (
    <div className="LoginMainContainer">
      <div className="LoginImgContainer">
        <img src="/img/LoginImg.png" alt="" />
      </div>
      <div className="LoginPageContainer">
        <div className="LoginPageContainerContent">
          <h2>Inicia sesión con tu cuenta</h2>

          <button className="LoginGoogleButton">
            <img src="/img/LogoGoogle.png" alt="Google logo" />
            <p>Continuar con Google</p>
          </button>
          
          <div className="divider">o Inicia sesión con su usuario</div>

          <form className="loginPageForm" onSubmit={handleLogin}>
            <label className="LoginInputText">
              <p>Usuario</p>
              <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Usuario" required
              />
            </label>

            <label className="LoginInputText">
              <p>Contraseña</p>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="*****************" required
              />
            </label>

            <div className="LoginRememberForgot">
              <label className="LoginRememberForgot__checkbox">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <p>Recuérdame</p>
              </label>
              <a href="/ForgotPasswordPage" className="ForgotPassword">
                ¿Olvidó la contraseña?
              </a>
            </div>

            {/* Botón con onClick para manejar el submit */}
            <button
              type="submit" // Se mantiene como botón de envío
              className="LoginPageButton"
            >
              Entrar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPageForm;