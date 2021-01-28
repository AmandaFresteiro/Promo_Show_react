import React from 'react';
import {useParams} from 'react-router-dom';
import PromotionForm from '../../../components/Promotion/Form/Form';
import UIContainer from '../../../components/UI/Container/Container'

const PagesPromotionForm = () => {
    const { id } = useParams(); // Qual parâmetro vamos extrair. Config em Root /edit/:id Esses : sempre significam o que queremos extrair

    return(
        <UIContainer>
            <PromotionForm id={id ? Number.parseInt(id, 10) : null}/>
        </UIContainer>
    );
 }

export default PagesPromotionForm;