import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom/client';
import { HomePage } from './pages/HomePage';

const contact = {
    name: 'João',
    lastName: 'da Silva',
    email: 'joao@teste.com'
}

function getFullName(contact) {
    return `${contact.name} ${contact.lastName}`;
}

function showName(){
    alert(contact.name);
}

// Componentes de Função
function HeaderApp(props){
    return (
        <div>
            <h1>{props.title}</h1>
            <h3>{props.subtitle}</h3>
        </div>
    )
}

// Class componentes

class Counter extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            total:0
        }
        console.log('Chamou o constructor')
    }

    incrementCounter = () => {
        const total = this.state.total+1;
        console.log('Chamou setState')
        this.setState({total});
    }

    render(){
        console.log('Chamou o render!!');
        return (
            <div>
                <h3>O total de clicks é: {this.state.total}</h3>
                <button onClick={this.incrementCounter}>Click aqui</button>
            </div>
        )
    }

    componentDidMount(){
        console.log('Chamou componentDidMount')
    }

    componentDidUpdate(){
        console.log('Chamou componentDidUpdate')
    }

}

function MyList() {
    const [fruits, setFruits] = useState([]);
    
    useEffect(() =>{
        function fetchData(){
            setTimeout(() => {
                setFruits(['Abacaxi','Banana','Laranja'])
            }, 3000);
        }
        fetchData();
    }, [])

    const items = fruits.map(item => <li key={item}>{item}</li>)
    return (
        <ul>
            {items}
        </ul>
    )

}

const element = (
    <div>
        <HeaderApp title="Aula ao vivo" subtitle="Reactjs Primeiros passos"/>
        <HeaderApp title="Aula ao vivo" subtitle="Reactjs React-router-dom"/>
        <HeaderApp title="Aula ao vivo" subtitle="Reactjs Redux pattern"/>
        <Counter/>
        <MyList/>
    </div>
);

const root = ReactDOM.createRoot(document.getElementById('root'));

// root.render(element);
root.render(<HomePage/>);