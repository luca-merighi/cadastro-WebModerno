import React from "react"
import Button from "../components/Button"
import Form from "../components/Form"
import Layout from "../components/Layout"
import Table from "../components/Table"
import useClients from "../hooks/useClients"

export default function Home() {

  const {
    clientSelected,
    clientDeleted,
    client,
    clients,
    newClient,
    saveClient,
    tabelaVisivel,
    exibirTabela
  } = useClients()

  return (
    <div className={`
      flex h-screen justify-center items-center
      bg-gradient-to-r from-purple-800 to-pink-600
      text-white
    `}>
      <Layout title="Cadastro">
        {tabelaVisivel ? (
          <>
          <div className="flex justify-end">
            <Button 
              color="green" 
              className="mb-4" 
              onClick={newClient}>Novo Cliente</Button>
          </div>
          <Table clients={clients} 
            clientSelected={clientSelected}
            clientDeleted={clientDeleted} />
            </>
        ) : (
          <Form 
            Client={client} 
            clientChanged={saveClient}
            canceled={exibirTabela}
            />
        )}  
        
      </Layout>
    </div>
  )
}
