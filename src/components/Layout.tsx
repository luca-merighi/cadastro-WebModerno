import Title from './Title'

interface LayoutProps {
    title?: string;
    children: any;
}

export default function Layout(props: LayoutProps) {
    return (
        <div className={`
            flex flex-col w-2/3 
            bg-blue-400 text-black rounded-md shadow-2xl	
        `}> 
            <Title>{props.title}</Title>
            <div className="p-6">
                {props.children}
            </div>
        </div>
    )
}