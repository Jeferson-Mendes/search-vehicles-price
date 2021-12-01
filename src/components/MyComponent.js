import { useEffect, useState } from "react";

import './myComponent.css';
import ResultModal from "./ResultModal";

const MyComponent = () => {

    const [brands, setBrands] = useState([]);
    const [models, setModels] = useState([]);
    const [years, setYears] = useState([]);
    const [result, setResult] = useState({
        Valor: '',
        Marca: '',
        Modelo: '',
        AnoModelo: 0,
        Combustivel: '',
        CodigoFipe: '',
        MesReferencia: '',
        SiglaCombustivel: '',
    });
    const [currentBrandCode, setCurrentBrandCode] = useState(0);
    const [currentModelCode, setCurrentModelCode] = useState(0);
    const [currentYearCode, setCurrentYearCode] = useState(0);

    const [modalIsOpen, setModalIsOpen] = useState(false);

    useEffect(()=> {
        const url = `https://parallelum.com.br/fipe/api/v1/carros/marcas`;

        fetch(url)
        .then(response => response.json())
        .then(data => {
            setBrands(data)
        })
        .catch(error => {
            console.log('ERROR: ', error)
        })
    },[])

    function handleChooseModel(event){
        const value = event.target.value;
        setCurrentBrandCode(value);
        const url = `https://parallelum.com.br/fipe/api/v1/carros/marcas/${value}/modelos`;

        fetch(url)
        .then(response => response.json())
        .then(data => {
            setModels(data.modelos)
        })
        .catch(error => {
            console.log('ERROR: ', error)
            alert('Há algo errado. Tente novamente')
        })
    }

    function handleChooseYear(event){
        const value = event.target.value;
        setCurrentModelCode(value);
        const url = `https://parallelum.com.br/fipe/api/v1/carros/marcas/${currentBrandCode}/modelos/${value}/anos`;

        fetch(url)
        .then(response => response.json())
        .then(data => {
            setYears(data);
        })
        .catch(error => {
            console.log('ERROR: ', error)
            alert('Há algo errado. Tente novamente')
        })
    }

    function handleSaveYear(event){
        const value = event.target.value
        setCurrentYearCode(value)
    }

    function handleButtonClick() {
        const url = `https://parallelum.com.br/fipe/api/v1/carros/marcas/${currentBrandCode}/modelos/${currentModelCode}/anos/${currentYearCode}`;

        fetch(url)
        .then(response => response.json())
        .then(data => {
            setResult(data)
        })
        .catch(error => {
            console.log('ERROR: ', error)
            alert('Há algo errado. Certifique-se de ter preenchido todos os campos')
        })

        setModalIsOpen(true);
    }

    function handleClose(){
        setModalIsOpen(false)
    }

    return (
        <div className="fipe">
            <div className="header">
                <h2>PREÇOS FIPE</h2>
                <p>Saiba o preço fipe do seu veículo.</p>                
            </div>
            <div className="brands">
                <label htmlFor="cars-brands">Escolha uma <i>marca:</i> </label>
                <select name="cars" id="cars-brands" onChange={handleChooseModel} >
                    <option value="0">...</option>
                    { brands.map(brand => (
                        <option key={brand.codigo} value={brand.codigo}>{brand.nome}</option>
                    )) }
                </select>
            </div>

            <div className="model">
                <label htmlFor="cars-model">Escolha um <i>modelo:</i></label>
                <select name="cars" id="cars-model" onChange={handleChooseYear} >
                    <option value="0">...</option>
                    { models.map(model => (
                        <option key={model.codigo} value={model.codigo}>{model.nome}</option>
                    )) }
                    
                </select>
            </div>

            <div className="year">
                <label htmlFor="cars-year">Escolha o <i>ano</i> do carro:</label>
                <select name="cars" id="cars-year" onChange={handleSaveYear}>
                    <option value="0">...</option>
                    { years.map(year => (
                        <option key={year.codigo} value={year.codigo}>{year.nome}</option>
                    )) }
                    
                </select>
            </div>

            <button className="btn-get-info" onClick={handleButtonClick} > Buscar </button>

            <ResultModal result={result} modalIsOpen={modalIsOpen} handleClose={handleClose}/>

            <div className="footer">
                <footer>
                    <span> &copy; <a href="https://github.com/Jeferson-Mendes">Jeferson Mendes</a> , Web I, Sistemas de Informação. API: <a href="https://deividfortuna.github.io/fipe/">FIPE API HTTP REST</a> </span>
                </footer>
            </div>
        </div>
    )
}

export default MyComponent;