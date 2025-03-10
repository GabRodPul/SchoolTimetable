import { AuthData, UserData } from "#common/@types/models";
import { useEffect, useState } from "react";

import './SigninPage.css'
import { useApi } from "#src/api/ApiContext";
import { ApiRts } from "#common/@enums/http";
import { FetchState } from "#src/types/api";
import { useNavigate } from "react-router";

const SigninPage = () => {
    const [name,        setName       ]  = useState('');
    const [surname1,    setSurname1   ]  = useState('');
    const [surname2,    setSurname2   ]  = useState('');
    const [email,       setEmail      ]  = useState('');
    const [phoneNumber, setPhoneNumber]  = useState('')
    const [password,    setPassword   ]  = useState('');
    const [rememberMe,  setRememberMe ]  = useState(false);
    const [fetchRsrc,   api           ]  = useApi<AuthData>(ApiRts.Signin);

    const navigate = useNavigate();

    const handleSignin = (event: React.FormEvent) => {
        event.preventDefault();
        const user = {
            name: [name, surname1, surname2].join(" "),
            email,
            phoneNumber,
            password,
        } as UserData;

        if (fetchRsrc.state == FetchState.NotStarted)
          api.signin!(user);
    };

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

    return (
        <div className="LoginPageContainer">
        <h2>Crea una cuenta nueva</h2>
        
        <button className="LoginGoogleButton">
          <img src="https://upload.wikimedia.org/wikipedia/commons/4/4a/Logo_2013_Google.png" alt="Logo de Google" />
          Continuar con Google
        </button>
        
        <div className="divider">o introduce tus datos</div>
        
        <form onSubmit={handleSignin}>
          <label>
            Nombre
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Nombre" required />
          </label>
          <label>
            Apellido 1
            <input type="text" value={surname1} onChange={(e) => setSurname1(e.target.value)} placeholder="Apellido1" required />
          </label>
          <label>
            Apellido 2
            <input type="text" value={surname2} onChange={(e) => setSurname2(e.target.value)} placeholder="Apellido2" />
          </label>

          <label>
            Email
            <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email@dominio.com" />
          </label>
          
          <label>
            Teléfono
            <input type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} placeholder="+34987654321" />
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

export default SigninPage;