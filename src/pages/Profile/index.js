import React,{useState,useEffect} from 'react'
import {Link, useHistory, useParams} from 'react-router-dom'
import './style.css'
import api from '../../services/api'

export default function Profile(){

    const {id} =useParams();

    const history = useHistory();

    const initUser={
        nome:'',
        email:'',
        idade: 0,
        empresa:''
    }

    const [user,setUser] = useState(initUser)


    useEffect(()=> {
        if(id){
            api.get(`/users/${id}`).then(response=>{
                setUser(...response.data)
            })
        }
    },[])
    function onSubmit(event){
        event.preventDefault()
        const method = id ? 'put' : 'post'
        const url = id

        ?`/users/${id}`
        :'/users' 
        api[method](url,user).then((response)=>{
            history.push('/')
        })
    }

    function onChange(event){
       const {name,value} = event.target

       setUser({...user,[name]:value})
    }
    return(
        <div id="profile-container">
            <h1>Cadastro</h1>
            <form onSubmit={onSubmit}>
                <strong>Nome:</strong>
                <input name="nome" onChange={onChange} value={user.nome}></input>

                <strong>Email:</strong>
                <input type="email" name="email" onChange={onChange} value={user.email}></input>

                <strong>Idade:</strong>
                <input name="idade" onChange={onChange} value={user.idade}></input>

                <strong>Empresa</strong>
                <input name="empresa" onChange={onChange} value={user.empresa}></input>

                <div className="actions">
                    <Link className="button"  onClick={()=>history.push('/')}>Voltar</Link>
                    <button className="button" type="submit">Salvar</button>
                </div>
               
            </form>
        </div>
    );
}