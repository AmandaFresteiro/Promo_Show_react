import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom'; // Utilizado para transferir o usuário para outra pagina de forma imperativa depois que ele preenche um formulário
import '../Form/Form.css';
import useApi from '../../utils/useApi'

const initialValue = {
    title: "",
    url: "",
    imageUrl: "",
    price: 0,
}

const PromotionForm = ({ id }) => {
    const[values, setValues] = useState(id ? null : initialValue);
    const history = useHistory();
    const [load] = useApi({
        url: `/promotions/${id}`,
        method: 'get',
        onCompleted: (response) => { //quando terminou o request inicial eu pego os valores e seto pro Values. 
            setValues(response.data);
        }
    });

    const [save, saveInfo] = useApi ({
        url: id ? `/promotions/${id}` : '/promotions',
        method: id ? 'put' : 'post',
        onCompleted: (response) => {
            if (!response.error) {
                history.push('/');
            }
        }
    })

    useEffect(() => { //Para usar o axios para atualizar o formulário toda vez que houver uma alteração do value dele
        if (id) { // Ou seja, todas as vezes que clicarmos em editar, ele vai preencher o formulário com as informações pré-existentes até hoje.
            load();
        }
        // eslint-disable-next-line
    }, [id]); // dentro do array colocamos o valor de quando queremos que o useEffect seja executado

    function onChange(ev) {
        const { name, value } = ev.target;

        setValues({ ...values, [name]: value})

    }

    function onSubmit(ev){
        ev.preventDefault(); //preventDefault = Não execute um comportamento default.
        save({
            data: values,
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
                        {saveInfo.loading && <span>Salvando dados...</span>}
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