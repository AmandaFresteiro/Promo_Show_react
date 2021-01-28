import { useState } from "react";
import axios from 'axios';

const initialRequestInfo = {
    error: null,
    data: null,
    loading: false,
};

export default function useApi(config) { // Usamos o Use em todos os hooks personalizados - por padrão.
    const [requestInfo, setRequestInfo] = useState(initialRequestInfo)

    async function call(localConfig) { //função load em Search.js O async tem que ser colocado para o await rodar
        setRequestInfo({
            ...initialRequestInfo,
            loading: true,
        });
        let response = null
        try {
            response = await axios({  // com o await ele espra o axios terminar o request e quando terminar ele atribui o valor da minha response do axios para a minha variável response
                baseURL: 'http://localhost:5000',
                ...config,
                ...localConfig,
            });
            setRequestInfo({
                ...initialRequestInfo,
                data: response.data,
            });
        } catch (error) {
            setRequestInfo({
                ...initialRequestInfo,
                error,
            });
        }
        
        if(config.onCompleted) {
            config.onCompleted(response);
        }
    }

    return [
        call,
        requestInfo
    ]
}