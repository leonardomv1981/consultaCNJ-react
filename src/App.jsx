import React from 'react';
import Modal from './Modal';
import InputText from './Form/InputText';
import Button from './Form/Button';
import ButtonModal from './ButtonModal';


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
        data = await data.json();

        if (data.hits.total.value === 0) {
            alert('Busca efetivada com sucesso, mas processo indisponível.');
            setDadosProcesso([]); // Limpa os dados
            return;
        }

        const resultado = data.hits.hits;
        setDadosProcesso(resultado);
    }

    function ProcessCard({ processo, onOpenModal }) {
        if (!processo || !processo._source) {
            return <div>Dados do processo inválidos</div>;
        }

        return (
            <div className="process-card" key={processo._id}>
                <h3>Número do Processo: {processo._source.numeroProcesso} - {processo._source.tribunal}</h3>
                <p><strong>Órgão Julgador:</strong> {processo._source.orgaoJulgador?.nome || 'Não informado'}</p>
                <p><strong>Instância:</strong>
                { processo._source.grau == 'G1' ? '1ª Instância' : 'Recursal' }
                </p>
                <p><strong>Data de distribuição:</strong> {processo._source.dataAjuizamento}</p>
                <p><strong>Data da última atualização:</strong> 
                {
                    new Intl.DateTimeFormat('pt-BR', {
                        dateStyle: 'short',
                        timeStyle: 'short',
                        timeZone: 'America/Sao_Paulo'
                    }).format(new Date(processo._source.dataHoraUltimaAtualizacao))
                }</p>
                <p><strong>Classe Processual:</strong> {processo._source.classe.nome}</p>
                <p><strong>Assunto:</strong> 
                {processo._source.assuntos.map((assunto, index) => (
                    <span key={index}>
                        {assunto.nome}{index < processo._source.assuntos.length - 1 ? ', ' : ''}
                    </span>
                ))};
                </p>
                <p><strong>Tipo de processo: </strong> {processo._source.formato.nome} - {processo._source.sistema.nome}</p>
                <ButtonModal onClick={onOpenModal} setModal={setModal} text="Ver movimentações" />
            </div>
        );
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
                    dadosProcesso.map((processo) => (
                        <ProcessCard 
                            key={processo._id} 
                            processo={processo} 
                            onOpenModal={() => setModal(true)}
                        />

                    ))
                ) : (
                    <p>Nenhum dado para exibir.</p>
                )}
            </div>
            <Modal modal={modal} setModal={setModal}/>
        </div>
    );
};

export default App;