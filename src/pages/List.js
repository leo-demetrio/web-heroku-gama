import React, { useState, useEffect } from 'react';
import axios from 'axios';


export default function List() {
    const [name, setName] = useState('');
    useEffect(() => {
       let name = JSON.parse(localStorage.getItem('name'));
       setName(name)
    },[]);
    
    return (
        <div className="container-list">
            <h1>Obrigado pelo cadastro</h1>
            <h2>{name}</h2>       
        </div>
    );
}