import React from 'react';
import Modal from './Modal';
import InputText from './Form/InputText';
import Button from './Form/Button';
import ButtonModal from './ButtonModal';
import ProcessCard from './ProcessCard';


const App = () => {
    const [numeroProcesso, setNumeroProcesso] = React.useState('');
    const [dadosProcesso, setDadosProcesso] = React.useState([]);
    const [modal, setModal] = React.useState(false);

    async function handleSubmit(event) {
        event.preventDefault();
        let processo = event.target.processo.value;
        processo = processo
            .replace(/\./g, '')
            .replace(/-/g, '')
            .replace(/_/g, '')
            .replace(/ /g, '');

        if (!validateProcesso(processo)) return;

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "numero_processo": processo,
            })
        };
        
        let data = await fetch('http://localhost:3001/api/cnj', options);
        // console.log(data.json())


        data = await data.json();
        console.log(data);

        // if (data.hits.total.value === 0) {
        //     alert('Busca efetivada com sucesso, mas processo indisponível.');
        //     setDadosProcesso([]); // Limpa os dados
        //     return;
        // }

        // const resultado = data;
        setDadosProcesso(data);
    }

    function validateProcesso(processo) {
        
        if (processo.length != 20) {
            alert('O número do processo deve conter 20 dígitos.');
            return false;
        }

        if (!/^\d+$/.test(processo)) {
            alert('O número do processo deve conter apenas dígitos.');
            return false;
        }
        
        //slicing numbers to validade specific digits with Módulo 97 Base 10, conforme Norma ISO 7064:2003
        const n = processo.slice(0, 7).toString();
        const d = processo.slice(7, 9).toString();
        const a = processo.slice(9, 13).toString();
        const j = processo.slice(13, 14).toString();
        const tr = processo.slice(14, 16).toString();
        const o = processo.slice(16, 20).toString();

        const oper1 = parseInt(n) % 97;
        const oper2 = parseInt((oper1.toString() + a + j + tr)) % 97;
        const result = parseInt((oper2.toString() + o + d)) % 97;

        if (result !== 1) {
            alert('Número do processo inválido.');
            return false;
        }

        return true;
    }

    return (
        <div>
            Consulta processual API Pública CNJ
            <hr />
            <br />
            <form id="form-submit-cnj" onSubmit={handleSubmit}>
                <InputText 
                    name="processo" 
                    label="Número do processo" 
                    id="input-process" 
                    placeholder="digite o numero do processo" 
                    mask="9999999-99.9999.9.99.9999"
                    value={numeroProcesso} 
                    setValue={setNumeroProcesso}
                    required
                />
                <Button texto="consultar" id="btn-submit-consulta" />
            </form>
            <div id="results-container">
                {dadosProcesso.length > 0 ? (
                    dadosProcesso.map((processo) =>
                        processo.data.hits.hits.map((item) => (
                            <ProcessCard
                                key={item._id}
                                processo={item}
                                tribunal={processo.tribunal}
                                setModal={setModal}
                            />
                        ))
                    )
                ) : (
                    <p>Nenhum dado para exibir.</p>
                )}
            </div>
            <Modal modal={modal} setModal={setModal}/>
        </div>
    );
};

export default App;