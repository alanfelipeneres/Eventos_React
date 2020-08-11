import React, { useState } from 'react';
import firebase from '../../config/firebase';
import 'firebase/auth';

import './usuario-novo.css';
import Navbar from '../../components/navbar/'

function NovoUsuario() {

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [msgTipo, setMsgTipo] = useState('');
    const [msg, setMsg] = useState('');
    const [carregando, setCarregando] = useState('');

    function Cadastrar() {
        setMsgTipo(null);

        setCarregando(1);

        if (!email || !senha) { //email ou senha vazios
            setMsgTipo("erro");
            setMsg("Você precisa informar email e senha para fazer cadastro");
            return;
        }

        firebase.auth().createUserWithEmailAndPassword(email, senha).then(resultado => {
            setCarregando(0);
            setMsgTipo('sucesso');
        }).catch(erro => {
            setCarregando(0);
            setMsgTipo('erro');

            switch (erro.code) {
                case "auth/email-already-in-use":
                    setMsg("O email informado está em uso por outro usuário");
                    break;
                case "auth/weak-password":
                    setMsg("A senha deve conter pelo o menos 6 caracteres");
                    break;
                case "auth/invalid-email":
                    setMsg("O email informado está inválido");
                    break;
                default:
                    setMsg("Não foi possível realizar o seu cadastro.");
                    break;
            }
        })

    }

    return (
        <>
            <Navbar></Navbar>
            <div className='form-cadastro'>
                <form className="text-center form-login mx-auto mt-5">
                    <h1 className="h3 mb-3 text-black font-wight-bold">Cadastro</h1>

                    <input onChange={(e) => setEmail(e.target.value)} type="email" className="form-control my-2" placeholder="Email"></input>
                    <input onChange={(e) => setSenha(e.target.value)} type="password" className="form-control my-2" placeholder="Senha"></input>

                    {
                        carregando ? <div class="spinner-border text-danger" role="status"> <span class="sr-only">Loading...</span> </div>
                            : <button onClick={Cadastrar} type="button" className="btn btn-lg btn-block mt-3 mb-5 btn-cadastro">Cadastrar</button>
                    }

                    <div className="msg-login text-black text-center my-5">
                        {msgTipo === 'sucesso' && <span><strong>WoW!</strong> Usuário cadastrado com sucesso! &#128526;</span>}
                        {msgTipo === 'erro' && <span><strong>Ops!</strong> {msg} &#128549;</span>}
                    </div>
                </form>
            </div>
        </>
    )
}

export default NovoUsuario;