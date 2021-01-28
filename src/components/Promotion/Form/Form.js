import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom'; // Utilizado para transferir o usuário para outra pagina de forma imperativa depois que ele preenche um formulário
import axios from 'axios';
import '../Form/Form.css';

const initialValue = {
    title: "",
    url: "",
    imageUrl: "",
    price: 0,
}

const PromotionForm = ({ id }) => {
    const[values, setValues] = useState(id ? null : initialValue);
    const history = useHistory();

    useEffect(() => { //Para usar o axios para atualizar o formulário toda vez que houver uma alteração do value dele
        if (id) { // Ou seja, todas as vezes que clicarmos em editar, ele vai preencher o formulário com as informações pré-existentes até hoje.
            axios.get(`http://localhost:5000/promotions/${id}`)
            .then((response) => {
                setValues(response.data);
            })
        }
    }, [id]);

    function onChange(ev) {
        const { name, value } = ev.target;

        setValues({ ...values, [name]: value})

    }

    function onSubmit(ev){
        ev.preventDefault(); //preventDefault = Não execute um comportamento default.

        const method = id ? 'put' : 'post'; // Ou seja, caso já haja uma id pré existente, vamos editar e fazer um put
                                            // E caso não tenha uma id vamos fazer um post que já está pronto aqui embaixo.
        const url = id
            ? `http://localhost:5000/promotions/${id}` // Exatamente o comentário anterior
            : 'http://localhost:5000/promotions'

        axios[method](url, values) // colocamos o [method] para automatizar o que fizemos em cima
            .then((response) => {
                history.push('/'); // redirecionamos para a página de listagem
            });
    }

    return(
        <div>
            <h1>Promo Show</h1>
            <h2>Nova Promoção</h2>
            {!values //Utilizamos essa conditional rendering para, caso não haja valores renderizados, carregamos o "Carregando", quando houver, renderizamos o HTML
                ? (
                  <div>Carregando...</div>  
                ) : (
                    <form onSubmit={onSubmit}>
                        <div className='promotion-form__group'>
                            <label htmlFor="title">Título</label>
                            <input id="title" name="title" type="text" onChange={onChange} value={values.title}/>
                        </div>
                        <div className='promotion-form__group'>
                            <label htmlFor="url">Link</label>
                            <input id="url" name="url" type="text" onChange={onChange} value={values.url}/>
                        </div>
                        <div className='promotion-form__group'>
                            <label htmlFor="imageUrl">Imagem (URL)</label>
                            <input id="imageUrl" name="imageUrl" type="text" onChange={onChange} value={values.imageUrl}/>
                        </div>
                        <div className='promotion-form__group'>
                            <label htmlFor="price">Preço</label>
                            <input id="price" name="price" type="number" onChange={onChange} value={values.price}/>
                        </div>
                        <div>
                            <button type="submit">Salvar</button>
                        </div>
                    </form>
                )}
        </div>
    )
};

export default PromotionForm;