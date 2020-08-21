import React, { useState, useEffect } from 'react';
import api from './services/api';

import './App.css';
//import backgroundImage from './assets/background.jpeg';

import Header from './components/Header';

function App(){
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        api.get('projects').then(response => {
            setProjects(response.data);
        });
    }, []);

    async function handleAddProject(){
        //não deixa fazer a imutabilidade
        // projects.push(`Novo projeto ${Date.now()}`);

        //fazendo imutabilidade
        //setProjects([...projects, `Novo projeto ${Date.now()}`]);

        //console.log(projects);

        const response = await api.post('projects', {            
            title: `Novo projeto ${Date.now()}`,
            owner: "Leo"            
        });
        const project = response.data;

        setProjects([...projects, project]);
    }

    return (
        <>
            <Header title="Projects"></Header>

            {/* <img width={300} src={backgroundImage} alt="moto"/> */}
            <ul>
                {projects.map(project => <li key={project.id}>{project.title}</li>)}
            </ul>

            <button type="button" onClick={handleAddProject}>Adicionar projetos</button>
        </>

    );
}

export default App;