import firebase from '../config'
import Client from "../../core/Client";
import ClientRepository from "../../core/ClientRepository";

export default class ClientColection implements ClientRepository {

    #conversor = {
        toFirestore(Client: Client) {
            return {
                nome: Client.nome,
                idade: Client.idade,
            }
        },

        fromFirestore(
            snapshot: firebase.firestore.QueryDocumentSnapshot, 
            options: firebase.firestore.SnapshotOptions): Client {
                const dados = snapshot.data(options)
                return new Client(dados.nome, dados.idade, snapshot.id)
        }
    }

    async salvar(Client: Client): Promise<Client> {
        if(Client?.id) {
            await this.colecao().doc(Client.id).set(Client)
            return Client
        } else {
            const docRef = await this.colecao().add(Client)
            const doc = await docRef.get()
            return doc.data()
        }
    }

    async excluir(Client: Client): Promise<void> {
        return this.colecao().doc(Client.id).delete()
    }
    async obterTodos(): Promise<Client[]> {
        const query = await this.colecao().get()
        return query.docs.map(doc => doc.data()) ?? []
    }

    private colecao() {
        return firebase.firestore().collection('clientes').withConverter(this.#conversor)
    }
}