import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import './Form.css';
import axios from 'axios';


const initialValues = {
    name: '',
    office: '',
    profession: '',
    birthdate: '',
    cpf: '',
    email: '',
    fixedline1: '',
    fixedline2: '',
    celphone: '',
    zipcode: '',
    neighborhood: '',
    address: '',
    city: '',
    sex: ''
}

function Form() {
    const [values, setValues] = useState(initialValues);
    const [data, setData] = useState({})

    const history = useHistory();

    function onChange(event) {
        const { name, value } = event.target;
        setValues({ ...values, [name]: value });
    }

    function onSubmit(event) {
        event.preventDefault();
        axios.post("http://localhost:9000/v1/usuarios/cadastro",values)
        .then(() => {
            localStorage.setItem('name',JSON.stringify(values.name));
            history.push('/list');
        })
        .catch((error) => {
            console.log(error) 
        });
      
    }
    function onBlurCep(event) {
        const value = event.target.value;
        const cep = value?.replace(/[^0-9]/g,'');
        if(cep?.length !== 8) { 
            return;
        }
        fetch(`https://viacep.com.br/ws/${cep}/json/`)
            .then(res => res.json())
            .then(data => {
                setData(data)             
            });
        return;
    }
    return (        
        <div className="container">
            <div className="title">Cadastro</div>
            <form onSubmit={onSubmit}>
                <div className="user-details">
                    <div className="input-box">
                        <span className="details">Nome Completo</span>
                        <input onChange={onChange} name="name" type="text" placeholder="Nome completo" required />
                    </div>
                    <div className="input-box">
                        <span className="details">Cargo Pretendido</span>
                        <input onChange={onChange} name="office" type="text" placeholder="Cargo pretendido" required />
                    </div>                  
                    <div className="input-box">
                        <span className="details">Profissão</span>
                        <input onChange={onChange} name="profession" type="text" placeholder="profissão" required />
                    </div>
                    <div className="input-box">
                        <span className="details">Data nascimento</span>
                        <input name="birthdate" onChange={onChange} type="date" placeholder="data de nascimento" required />
                    </div>
                    <div className="input-box">
                        <span className="details">CPF</span>
                        <input onChange={onChange} name="cpf" type="text" placeholder="xxx-xxx-xxx-xx" required />
                    </div>
                    <div className="input-box">
                        <span className="details">Email</span>
                        <input onChange={onChange} name="email" type="email" placeholder="xxxxxx@xmail.com" required />
                    </div>
                    <div className="input-box">
                        <span className="details">Telefone fixo 1</span>
                        <input onChange={onChange} name="fixedline1" type="tel" placeholder="telefone" required />
                    </div>
                    <div className="input-box">
                        <span className="details">Telefone fixo 2</span>
                        <input onChange={onChange} name="fixedline2" type="tel" placeholder="telefone" required />
                    </div>
                    <div className="input-box">
                        <span className="details">Celular</span>
                        <input onChange={onChange} name="celphone" type="tel" placeholder="Enter your name" required />
                    </div>
                    <div className="input-box">
                        <span className="details">Cep</span>
                        <input onChange={onChange} name="zipcode" onBlur={onBlurCep} type="text" placeholder="Enter your name" required />
                    </div>
                    <div className="input-box">
                        <span className="details">Bairro</span>
                        <input  value={data.bairro} onChange={onChange} name="neighborhood" type="text" placeholder="Enter your name" required />
                    </div>
                    <div className="input-box">
                        <span className="details">Endereço</span>
                        <input value={data.logradouro} onChange={onChange} name="address" type="text" placeholder="Enter your name" required />
                    </div>
                    <div className="input-box">
                        <span className="details">Complemento</span>
                        <input onChange={onChange} name="number" type="text" placeholder="Enter your name" required />
                    </div>
                    <div className="input-box">
                        <span className="details">Cidade</span>
                        <input value={data.localidade} onChange={onChange} name="city" type="text" placeholder="Enter your name" required />
                    </div> 
                    <div className="input-box">
                    <span className="details">Sexo</span>
                        <select  onChange={onChange} className="details" name="sex" id="cars">
                            <option value="">Selecione o sexo</option>
                            <option onChange={onChange} value="masculino">Masculino</option>
                            <option onChange={onChange} value="feminino">Feminino</option>
                            <option onChange={onChange} value="pnd">Prefiro não dizer</option>
                        </select>
                    </div>
                </div>  
                <div className="button">
                        <input type="submit" value="register" />
                </div>            
            </form>    
        </div>       
    )
}
export default Form;