import _React from 'react';
import './LoginPageStyles.css';
import { useState } from 'react';

function LoginPageForm () {
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
          <img src="https://upload.wikimedia.org/wikipedia/commons/4/4a/Logo_2013_Google.png" alt="Google logo" />
          Continuar con Google
        </button>
        
        <div className="divider">o Inicia sesión con su usuario</div>
        
        <form onSubmit={handleLogin}>
          <label>
            Usuario
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Usuario" required />
          </label>
          
          <label>
            Contraseña
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Contraseña" required />
          </label>
          
          <div className="LoginRememberForgot">
            <label>
              <input type="checkbox" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)}/>
              Recuérdame
            </label>
            <a href="/ForgotPasswordPage" className="ForgotPassword">¿Olvidó la contraseña?</a>
          </div>
          
          <a href="/Home"><button type="submit" className="LoginPageButton">Entrar</button></a>
        </form>
      </div>
    );
  }

export default LoginPageForm;