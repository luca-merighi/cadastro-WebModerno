import Client from './Client'

export default interface ClientRepository {
    salvar(Client: Client): Promise<Client>
    excluir(Client: Client): Promise<void>
    obterTodos(): Promise<Client[]>
}