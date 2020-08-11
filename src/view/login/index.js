import React, { useState } from 'react';
import './login.css';
import firebase from '../../config/firebase';
import 'firebase/auth';
import { Link, Redirect } from 'react-router-dom'

import { useSelector, useDispatch } from 'react-redux';

function Login() {

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [msgTipo, setMsgTipo] = useState('');

    const dispatch = useDispatch();

    //alert(useSelector(state => state.usuarioEmail));

    function logar() {
        firebase.auth().signInWithEmailAndPassword(email, senha).then(resultado => {
            setMsgTipo("sucesso");

            //Time out pra apresentar mensagem que o usuário foi logado
            setTimeout(() => {
                //Adicionando um status ao reducer
                dispatch({
                    type: 'LOG_IN',
                    usuarioEmail: email
                });
            }, 2000);




        }).catch(erro => {
            setMsgTipo("erro");
        });


    }

    return (
        <div className="login-content d-flex align-items-center">

            {/* Verificando se o usuário está logado através do redux */}
            {useSelector(state => state.usuarioLogado > 0 ? <Redirect to="/" /> : null)}

            <form className="form-signin mx-auto">
                <div className="text-center mb-4">
                    <i class="far fa-smile-wink text-white fa-5x"></i>

                    <img className="mb-4" src="/docs/4.5/assets/brand/bootstrap-solid.svg" alt="" width="72" height="72" />
                    <h1 className="h3 mb-3 font-weight-normal text-white font-weight-bold">Login</h1>
                </div>

                <input onChange={(e) => setEmail(e.target.value)} type="email" id="inputEmail" class="form-control my-2" placeholder="Email address" />
                <input onChange={(e) => setSenha(e.target.value)} type="password" id="inputPassword" class="form-control my-2" placeholder="Senha" />

                <button onClick={logar} className="btn btn-lg btn-block btn-login" type="button">Sign in</button>

                <div className="msg-login text-white text-center my-5">
                    {msgTipo === 'sucesso' && <span><strong>WoW!</strong> Você está conectado! &#128526;</span>}
                    {msgTipo === 'erro' && <span><strong>Ops!</strong> Verifique se a senha ou usuário estão corretos! &#128549;</span>}
                </div>

                <div className="opcoes-login mt-5 text-center">
                    {/* <a href="#" className="mx-2">Recuperar Senha</a> */}
                    <Link to="usuariorecuperarsenha" className="mx-2">Recuperar Senha</Link>
                    
                    <span className="text-white">&#9733;</span>
                    <Link to="novousuario" className="mx-2">Quero Cadastrar</Link>

                </div>
            </form>
        </div>
    )
}

export default Login;