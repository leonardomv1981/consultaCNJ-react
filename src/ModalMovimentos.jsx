import React from 'react'

const ModalMovimentos = ({movimentos, setClose}) => {
    const closeModal = () => {
        setClose('');
    }
    console.log(movimentos)
    return (
        <div className="modal-overlay">
            <h1 className="modal-title">Movimentações</h1>
            <button id="close-modal" onClick={closeModal}>FECHAR</button>
            <div className="modal-movimentos">
                {movimentos.map((movimento, index) => (
                    <div key={index+movimento.dataHora+movimento.codigo}>
                        Data: {new Intl.DateTimeFormat('pt-BR', {
                            dateStyle: 'short',
                            timeStyle: 'short',
                            timeZone: 'America/Sao_Paulo'
                        }).format(new Date(movimento.dataHora))}<br />
                        (Cod {movimento.codigo}) {movimento.nome} 
                        {movimento.complementosTabelados && movimento.complementosTabelados.map((complemento) => (
                            <>
                                ({complemento.nome})
                            </>
                        ))}
                        <br />
                        {movimento.orgaoJulgador && movimento.orgaoJulgador.nome}
                        <hr />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ModalMovimentos
