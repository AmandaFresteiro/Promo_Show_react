import React, { useState, useEffect } from 'react';
import PromotionList from '../List/List';
import { Link } from 'react-router-dom';
import useApi from '../../../components/utils/useApi'
import '../Search/Search.css';

const PromotionSearch = () => {
    const [search, setSearch] = useState('');
    const [load, loadInfo] = useApi({ // hooks personalizado para nao precisar usar o axios
        url:'/promotions',
        method: 'get',
        params:{
            _embed: 'comments',
            _order: 'desc',
            _sort: 'id',
            title_like: search || undefined,
        },
    });

    useEffect(() => {
      load (); // toda a vez que mudar a abusca, ele faz o load e toda vez que iniciar ele tb faz o load.
    }, [search]); // faz a mesma coisa que o axios

    return (
        <div className="promotion-search">
            <header className="promotion-search__header">
                <h1>Promo Show</h1>
                <Link to="/create">Nova Promoção</Link>
            </header>
            <input 
                type="search" 
                className="promotion-search__input" 
                placeholder="Buscar"
                value={search}
                onChange={(ev) => setSearch(ev.target.value)}
            />
            <PromotionList
                promotions={loadInfo.data} 
                loading={loadInfo.loading}
                error={loadInfo.error} 
            />
        </div>
    );
};

export default PromotionSearch;