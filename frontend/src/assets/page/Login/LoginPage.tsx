import _React, { useEffect } from 'react';
import './LoginPageStyles.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthData } from '#common/@types/models';
import { ApiRts } from '#common/@enums/http';
import { useApi } from '#src/api/ApiContext';
import { FetchState } from '#src/types/api';

function LoginPageForm() {
  const [email,      setEmail       ] = useState('');
  const [password,   setPassword    ] = useState('');
  const [rememberMe, setRememberMe  ] = useState(false);
  const [fetchRsrc,  api            ] = useApi<AuthData>(ApiRts.Login);

  const navigate = useNavigate();

  useEffect(() => {
    console.log(fetchRsrc)

    switch (fetchRsrc.state) {
      case FetchState.Success: {
        const data = fetchRsrc.data as any;
        if (data.code) {
          // TODO: ERROR CONTRASEÑA ETC
        }
        
        if (data.accessToken !== undefined) {
          localStorage.setItem("currentUser", JSON.stringify(fetchRsrc.data));
          navigate("/Home");
          return;
        }

        console.log((fetchRsrc))
        api.resetRsrc();
      } break;

      case FetchState.Error: {
        api.resetRsrc();
      }
    }
  }, [fetchRsrc])

  const handleLogin = (event: React.FormEvent) => {
    event.preventDefault();
    // Validación de campos vacíos
    if (!email || !password) {
        alert("Por favor, complete todos los campos."); // Muestra un mensaje de alerta
        return; // Detiene la ejecución si hay campos vacíos
    }
    if (fetchRsrc.state === FetchState.NotStarted) {
        api.login!({ email, password });
    }

    console.log('Correo:', email);
    console.log('Contraseña:', password);
    console.log('Recuérdame:', rememberMe);
    // navigate('/Home'); // Esta línea se puede dejar comentada, ya que la navegación se maneja en el useEffect
};

  if (localStorage.getItem("currentUser"))
    navigate("/Home");

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
              <p>Email</p>
              <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required
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
            { fetchRsrc.state === FetchState.Success && 
              (fetchRsrc.data as any).code !== undefined 
              && <div>
              <p color="red">(fetchRsrc.data as any).mess</p>
            </div>
            }
            {/* Botón con onClick para manejar el submit */}
            <button
              type="submit" // Se mantiene como botón de envío
              className="LoginPageButton"
              onClick={() =>
              handleLogin}
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