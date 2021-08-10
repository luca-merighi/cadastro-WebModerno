import Client from '../core/Client'
import { IconEdit, IconTrash } from './Icons'

interface TableProps {
    clients: Client[],
    clientSelected?: (Client: Client) => void,
    clientDeleted?: (Client: Client) => void,
}

export default function Table(props: TableProps) {

    const showActions = props.clientDeleted || props.clientSelected
   
    function renderHeader() {
        return (
            <tr>
                <th className="text-left p-4">Código</th>
                <th className="text-left p-4">Nome</th>
                <th className="text-left p-4">Idade</th>
                {showActions ? <th className="p-4">Ações</th> : false}
            </tr>
        )
    }

    function renderData() {
        return props.clients?.map((Client, i) => {
            return (
                <tr key={Client.id} 
                    className={`${i % 2 === 0 ? 'bg-blue-500' : 'bg-blue-300'}`}>
                    <td className="text-left p-4">{Client.id}</td>
                    <td className="text-left p-4">{Client.nome}</td>
                    <td className="text-left p-4">{Client.idade}</td>
                    {showActions ? renderActions(Client) : false}
                </tr>
            )
        }) 
    }

    function renderActions(Client: Client) {
        return (
            <td className="flex justify-center">    
                {props.clientSelected ? (
                    <button onClick={() => props.clientSelected?.(Client)} className={`
                    flex justify-center items-center
                    text-green-600 rounded-full p-2 m-1
                    hover:bg-purple-50
                    `}>
                        {IconEdit}
                    </button>
                ) : false}
                {props.clientDeleted ? (
                    <button onClick={() => props.clientDeleted?.(Client)} className={`
                    flex justify-center items-center
                    text-red-500 rounded-full p-2 m-1
                    hover:bg-purple-50
                    `}>
                        {IconTrash}
                    </button>
                ) : false}
                
                
            </td>
        )
    }

    return (
        <table className="w-full rounded-xl overflow-hidden">
            <thead className={`
                text-gray-100
                bg-gradient-to-r from-purple-500 to-purple-800
            `}>
                {renderHeader()} 
            </thead>
            <tbody>
                {renderData()}
            </tbody>
        </table>
    )
}