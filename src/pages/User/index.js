import React,{useState, useEffect} from 'react'
import api from '../../services/api'
import './style.css'

export default function User(){
    const [users, setUsers] = useState([])

    useEffect(() => {
        api.get('users').then(Response =>{
            setUsers(Response.data)
        })
    },[])

    return (
        <div id="user-container">
            <h1>Lista de Usuários</h1>
            <ul className="user-list">
              {
                  users.map(user => (
                    <li key={user.id}>
                        <strong>Nome</strong>
                        <p>{user.nome}</p>
                        <strong>Email</strong>
                        <p>{user.email}</p>
                        <strong>Idade</strong>
                        <p>{user.idade}</p>
                        <strong>Empresa</strong>
                        <p>{user.empresa}</p>
                    </li>
                  ))
              }
                
            </ul>
        </div>
    );
}