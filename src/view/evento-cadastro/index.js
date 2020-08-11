import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import './evento-cadastro.css';
import firebase from '../../config/firebase';
import 'firebase/auth';
import { Link, Redirect } from 'react-router-dom'
import Navbar from '../../components/navbar/'

function EventoCadastro(props) {

    const [msgTipo, setMsgTipo] = useState('');
    const [titulo, setTitulo] = useState('');
    const [tipo, setTipo] = useState('');
    const [detalhes, setDetalhes] = useState('');
    const [data, setData] = useState('');
    const [hora, setHora] = useState('');
    //Foi criada uma variával para auxiliar o upload das fots
    const [fotoAtual, setFotoAtual] = useState('');
    const [fotoNova, setFotoNova] = useState('');
    const [carregando, setCarregando] = useState('');

    //Obtendo o usuário email que foi informado no store/usuarioReducer
    const usuarioEmail = useSelector(state => state.usuarioEmail);

    const storage = firebase.storage();
    const db = firebase.firestore();


    useEffect(() => {
        if (props.match.params.id) {
            firebase.firestore().collection('eventos').doc(props.match.params.id).get().then(resultado => {
                setTitulo(resultado.data().titulo);
                setTipo(resultado.data().tipo);
                setDetalhes(resultado.data().detalhes);
                setData(resultado.data().data);
                setHora(resultado.data().hora);

                setFotoAtual(resultado.data().foto);
            });
        }
    }, [carregando])


    //setUsuarioEmail(useSelector(state => state.usuarioEmail));


    function atualizar() {
        setCarregando(1);
        setMsgTipo(null);

        if (fotoNova) {
            //local onde vai ser salvo o arquivo - Upload
            storage.ref('imagens/' + fotoNova.name).put(fotoNova);
        }


        //Nome da 'coleção' lá no 'Data Base' do Firebase
        db.collection('eventos').doc(props.match.params.id).update({
            titulo: titulo,
            tipo: tipo,
            detalhes: detalhes,
            data: data,
            hora: hora,
            foto: fotoNova ? fotoNova.name : fotoAtual
        }).then(() => {
            setCarregando(0);
            setMsgTipo('sucesso');
        }).catch(erro => {
            setCarregando(0);
            setMsgTipo('erro');
        })
    }

    function cadastrar() {
        setCarregando(1);
        setMsgTipo(null);

        //local onde vai ser salvo o arquivo - Upload
        storage.ref('imagens/' + fotoNova.name).put(fotoNova).then(() => {

            //Nome da 'coleção' lá no 'Data Base' do Firebase
            db.collection('eventos').add({
                titulo: titulo,
                tipo: tipo,
                detalhes: detalhes,
                data: data,
                hora: hora,
                usuario: usuarioEmail,
                visualizacoes: 0,
                foto: fotoNova.name,
                publico: 1,
                criacao: new Date()
            }).then(() => {
                setCarregando(0);
                setMsgTipo('sucesso');
            }).catch(erro => {
                setCarregando(0);
                setMsgTipo('erro');
            })
        })
    }

    return (
        <>
            <Navbar></Navbar>
            <div className="col-12 mt-5">
                <div className="row">
                    <h3 className="mx-auto font-weight-bold">{props.match.params.id ? 'Atualizar Evento' : 'Novo Evento'}</h3>
                </div>
                <form>
                    <div className="form-group">
                        <label>Titulo</label>
                        <input onChange={(e) => setTitulo(e.target.value)} type="text" className="form-control" value={titulo && titulo}></input>
                    </div>

                    <div className="form-group">
                        <label>Tipo do Evento</label>

                        <select className="form-control" onChange={(e) => setTipo(e.target.value)} value={tipo && tipo}>
                            <option disabled selected value>-- Selecione um tipo --</option>
                            <option>Festa</option>
                            <option>Teatro</option>
                            <option>Show</option>
                            <option>Evento</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Descrição do Evento</label>
                        <textarea onChange={(e) => setDetalhes(e.target.value)} className="form-control" rows="3" value={detalhes && detalhes}></textarea>
                    </div>

                    <div className="form-group row">
                        <div className="col-6">
                            <label>Data</label>
                            <input onChange={(e) => setData(e.target.value)} type="date" className="form-control" value={data && data}></input>
                        </div>

                        <div className="col-6">
                            <label>Hora</label>
                            <input onChange={(e) => setHora(e.target.value)} type="time" className="form-control" value={hora && hora}></input>
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Upload da Foto {props.match.params.id ? "(caso queira manter a mesma foto, não precisa escolher uma nova imagem!)" : ""}</label>
                        {/* No upload será add apenas um arquivo, por isso é utilizado o índice 0 */}
                        <input onChange={(e) => setFotoNova(e.target.files[0])} type="file" className="form-control"></input>
                    </div>

                    {/* <button onClick={cadastrar} type="button" className="btn btn-lg btn-block mt-3 mb-5 btn-cadastro">Publicar Evento</button> */}


                    <div className="row">
                        {
                            carregando ? <div class="spinner-border text-danger mx-auto" role="status"> <span class="sr-only">Loading...</span> </div>
                                : <button onClick={props.match.params.id ? atualizar : cadastrar} type="button" className="btn btn-lg btn-block mt-3 mb-5 btn-cadastro">{props.match.params.id ? 'Atualizar Evento' : 'Publicar Evento'}</button>
                        }
                    </div>




                </form>

                <div className="msg-login text-center my-2">
                    {msgTipo === 'sucesso' && <span><strong>WoW!</strong> Evento Publicado! &#128526;</span>}
                    {msgTipo === 'erro' && <span><strong>Ops!</strong> Não foi possível publicar o evento! &#128549;</span>}
                </div>

            </div>
        </>
    )
}

export default EventoCadastro;