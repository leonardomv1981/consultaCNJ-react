import React from 'react';
import Modal from './Modal';
import InputText from './Form/InputText';
import Button from './Form/Button';


const App = () => {

    const [processo, setProcesso] = React.useState('');
    const [dadosProcesso, setDadosProcesso] = React.useState('');
    const [modal, setModal] = React.useState(false);
    const resultContainer = document.getElementById('results-container');

    async function handleSubmit() {
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
        data = await data.json();

        if (data.hits.total.value == 0) {
            alert('Busca efetivada com sucesso, mas processo indisponível.');
        }

        const resultado = data.hits.hits;

        generateReport(resultado);
 
    }

    function generateReport(resultado) {
        setDadosProcesso('');
        console.log(resultado);
        resultado.map((processo) => {
            console.log(processo)
            setDadosProcesso((dadosProcesso) => 
                `<div class="process-card" key=${processo._id}>
                    <h3>Número do Processo: ${processo._source.numeroProcesso}</h3>
                    <p><strong>Órgão Julgador:</strong> ${processo._source.orgaoJulgador.nome}</p>
                    <p><strong>Data de Distribuição:</strong> ${processo._source.dataAjuizamento}</p>
                    <p><strong>Data de Atualização:</strong> ${processo._source.dataHoraUltimaAtualizacao}</p>
                    <p><strong>Classe Processual:</strong> ${processo._source.classeProcessual}</p>
                    <p><strong>Assunto:</strong> ${processo._source.assuntos}</p>
                    <p><strong>Situação:</strong> ${processo._source.situacao}</p>
                </div><br/>`
            );
        });
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
        const oper2 = parseInt((oper1.toString() + a + j + tr )) % 97;
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
                <InputText name="processo" label="Número do processo" id="input-process" placeholder="digite o numero do processo" mask="9999999-99.9999.9.99.9999" value={processo} setValue={setProcesso} required/>
                <Button texto="consultar" id="btn-submit-consulta" />
            </form>
            <div id="results-container">
                {dadosProcesso}
            </div>
            <Modal modal={modal} setModal={setModal}/>
        </div>
    );
};



export default App;