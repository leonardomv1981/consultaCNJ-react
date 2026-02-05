import React from 'react'
import Button from './Form/Button'

function ProcessCard({processo, setModal}) {
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
      <Button texto="Ver movimentações" />
    </div>
  )
}

export default ProcessCard


{/*  */}