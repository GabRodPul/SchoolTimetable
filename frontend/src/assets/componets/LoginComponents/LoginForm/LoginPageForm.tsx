import React from 'react';
import { useState } from 'react';
import './LoginPageFormStyles.css'

function LoginPageForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = (event: React.FormEvent) => {
    event.preventDefault();

    console.log('Usuario:', username);
    console.log('Contraseña:', password);
    console.log('Recuérdame:', rememberMe);
  };

  return (
    <div className="LoginPageContainer">
      <h2>Inicia sesión con tu cuenta</h2>

      <button className="LoginGoogleButton">
        <img src="../../../../public/img/LogoGoogle.png" alt="Google logo" />
        <p>Continuar con Google</p>
      </button>

      <div className="divider">o Inicia sesión con su usuario</div>

      <form onSubmit={handleLogin}>
        <label className="LoginInputText">
          <p>Usuario</p>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Usuario" required />
        </label>

        <label className="LoginInputText">
          <p>Contraseña</p>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="*****************" required />
        </label>

        <div className="LoginRememberForgot">
          <label>
            <input type="checkbox" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} />
            <p>Recuérdame</p>
          </label>
          <a href="/ForgotPasswordPage" className="ForgotPassword">¿Olvidó la contraseña?</a>
        </div>

        <a href="/Home"><button className="LoginPageButton">Entrar</button></a>
      </form>
    </div>
  );
}

export default LoginPageForm;