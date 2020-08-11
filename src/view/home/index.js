//useEffect executa algo quando a tela é carregada
import React, { useState, useEffect } from 'react';
import './home.css';
// import { Link } from 'react-router-dom'
import Navbar from '../../components/navbar/';
import EventoCard from '../../components/evento-card/';
import { useSelector } from 'react-redux';
import firebase from '../../config/firebase';

function Home({ match }) {

    const [eventos, setEventos] = useState([]);
    const [pesquisa, setPesquisa] = useState('');
    let listaeventos = [];

    const usuarioEmail = useSelector(state => state.usuarioEmail);

    useEffect(() => {
        if (match.params.parametro) {
            // alert('aqui vai o filtro dos seus eventos');

            //Devemso filtrar a através do 'where'. O 'where', recebe 3 parâmetros
            //1: campo a ser utilizado no filtro
            //2: operador lógico
            //3: a variável a ser comparada
            firebase.firestore().collection('eventos').where('usuario', '==', usuarioEmail).get().then(async (resultado) => {
                //A função é assincrona mas devido ao 'await' o sitema irá esperar o resultados com os eventos

                //A função é assincrona mas devido ao 'await' o sitema irá esperar o resultados com os eventos
                await resultado.docs.forEach(doc => {

                    if (doc.data().titulo.indexOf(pesquisa) >= 0) {
                        listaeventos.push({
                            id: doc.id,
                            //Um dado noSql guarda os registros dentro de um documento (id)
                            //Para eu acessar os dados de um registro, eu devo obte-los através do id
                            //Com o operar de spread "..." eu consigo expandir o conteúdo de um objeto, array, string e etc
                            //Por isso foi utilizado o operar spread para pegar todos os dados do doc no Firebase
                            ...doc.data()
                        })
                    }



                });

                setEventos(listaeventos);


            })


        } else {
            firebase.firestore().collection('eventos').get().then(async (resultado) => {
                //A função é assincrona mas devido ao 'await' o sitema irá esperar o resultados com os eventos
                await resultado.docs.forEach(doc => {

                    if (doc.data().titulo.indexOf(pesquisa) >= 0) {
                        listaeventos.push({
                            id: doc.id,
                            //Um dado noSql guarda os registros dentro de um documento (id)
                            //Para eu acessar os dados de um registro, eu devo obte-los através do id
                            //Com o operar de spread "..." eu consigo expandir o conteúdo de um objeto, array, string e etc
                            //Por isso foi utilizado o operar spread para pegar todos os dados do doc no Firebase
                            ...doc.data()
                        })
                    }



                });

                setEventos(listaeventos);

            })
        }



    });

    return (
        <>
            <Navbar></Navbar>
            {/* <h1>{useSelector(state => state.usuarioEmail)}</h1>
            <h1>Logado: {useSelector(state => state.usuarioLogado)}</h1> */}

            {/* Margin em cima e embaixo my e dos lados mx */}
            <div className="row p-5">
                <h2 className="mx-auto p-5">Eventos Publicados</h2>

                <input type="text" onChange={(e) => setPesquisa(e.target.value)} className="form-control text-center" placeholder="Pesquisar evento pelo título..."></input>
            </div>


            <div className="row p-3">
                {/* Estou mapeando cada item existente no objeto 'eventos' e colocando-o em 'EventoCard' */}
                {eventos.map(item => <EventoCard id={item.id} img={item.foto} titulo={item.titulo} detalhes={item.detalhes} visualizacoes={item.visualizacoes} />)}
            </div>
        </>
    )
}

export default Home;