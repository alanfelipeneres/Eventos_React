import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import './evento-card.css';
import firebase from '../../config/firebase';

function EventoCard({ id, img, titulo, detalhes, visualizacoes }) {

    //Não esquecer... os métodos de encapsulamento do useState é com colchetes ao invés de chaves
    const [ urlImagem, setUrlImagem ] = useState();

    useEffect(() => {
        //console.log(img);
        //firebase.storage().ref('imagens/' + img).getDownloadURL().then(url => setUrlImagem(url));
        firebase.storage().ref('imagens/' + img).getDownloadURL().then(url => setUrlImagem(url));

        

    //O useEffect é convocado por padrão uma vez
    //Para carregar a imagem, colocamos o urlImagem no array para forçarmos o carregamento da imagem quando a url mudar
    }, [urlImagem]);

    return (
        <div className="col-md-3 col-sm-12">
            <img src={urlImagem} className="card-img-top img-cartao" alt="Imagem do Evento"></img>


            <div className="card-body">
                {/* <h5>Título do Evento</h5> */}
                {titulo}
                <p className="card-text text-justify">
                    {detalhes}
                </p>

                <div className="row rodape-card d-flex align-items-center">

                    <div className="col-6">
                        <Link to={"/eventodetalhes/" + id } className="btn btn-sm btn-detalhes">+ detalhes</Link>
                    </div>
                    <div className="col-6 text-right">
                        <i class="fas fa-eye"></i> <span>{visualizacoes}</span>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default EventoCard;