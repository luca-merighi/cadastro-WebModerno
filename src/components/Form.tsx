import { useState } from "react";
import Client from "../core/Client";
import Button from "./Button";
import Entry from "./Entry";

interface FormProps {
    Client: Client,
    clientChanged?: (Client: Client) => void,
    canceled?: () => void,
}

export default function Form(props: FormProps) {
    const id = props.Client?.id
    const [name, setName] = useState(props.Client?.nome ?? '')
    const [idade, setIdade] = useState(props.Client?.idade ?? 0)

    return (
        <div>
            {id ? (
                <Entry 
                    readOnly 
                    text="Código" 
                    value={id} 
                    className="mb-4" />
            ) : false}
            <Entry 
                text="Nome" 
                value={name} 
                valueChanged={setName} 
                className="mb-4" />
            <Entry 
                text="Idade"
                tipo="number" 
                value={idade} 
                valueChanged={setIdade} />

                <div className="flex justify-end mt-5">
                    <Button 
                        color="blue" 
                        className="mr-2" 
                        onClick={() => props.clientChanged?.(new Client(name, +idade, id))}>
                        {id ? 'Alterar' : 'Salvar'}
                    </Button>
                    <Button onClick={props.canceled}>
                        Cancelar
                    </Button>
                </div>
        </div>
    )
}