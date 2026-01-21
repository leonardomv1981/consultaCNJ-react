// Faça um fetch (POST) para a API abaixo
// Para a criação ser aceita é necessário enviar dodos de:
// nome, email, senha, cep, rua, numero, bairro, cidade e estado

import React, { StrictMode } from 'react';

const AppC = () => {

    const [cores, setCores] = React.useState([]);
    const coresArray = ['azul', 'roxo', 'laranja', 'verde', 'vermelho', 'cinza'];

    function handleChange({ target }) {
        if (target.checked) {
        setCores([...cores, target.value]);
        } else {
        setCores(cores.filter((cor) => cor !== target.value));
        }
    }

    function handleChecked(cor) {
        return cores.includes(cor);
    }


    return (
        <form>
            {coresArray.map((cor) => 
             (
                <label key={cor}>
                    <input 
                    type="checkbox"
                    value={cor} 
                    checked={handleChecked(cor)}
                    onChange={handleChange}
                    />{cor}
                </label>
             ))}
            
            <ul>
                {cores.map((cor) => (
                <li key={cor}>{cor}</li>
                ))}
            </ul>
        </form>
    );
};



export default AppC;