import { useEffect, useState } from "react"
import Client from "../core/Client"
import ClientRepository from "../core/ClientRepository"
import ClientColection from "../firebase/db/ClientColection"
import useTableOrForm from "./useTableOrForm"

export default function useClients() {
    const repo: ClientRepository = new ClientColection()

    const {
        tabelaVisivel,
        formularioVisivel,
        exibirTabela,
        exibirForm
    } = useTableOrForm()

    const [client, setClient] = useState<Client>(Client.vazio())
    const [clients, setClients] = useState<Client[]>([])
  
    useEffect(obterTodos, [])
    
    function obterTodos() {
      repo.obterTodos().then(clients => {
        setClients(clients)
        exibirTabela()
      })
  
    }
  
    function clientSelected(Client: Client) {
      setClient(Client)
      exibirForm()
    }
  
    async function clientDeleted(Client: Client) {
      await repo.excluir(Client)
      obterTodos()
    }
  
    function newClient() {
      setClient(Client.vazio())
      exibirForm()
    }
  
    async function saveClient(Client: Client) {
      await repo.salvar(Client)
      obterTodos()
    }

    return {
        client,
        clients,
        newClient,
        saveClient,
        clientDeleted,
        clientSelected,
        tabelaVisivel,
        exibirTabela,
    }
}