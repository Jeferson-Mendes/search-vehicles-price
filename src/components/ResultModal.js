
import './resultModal.css';

const ResultModal = ({ result, modalIsOpen, handleClose }) => {
    function closeModal() {
        handleClose()
    }

    return (
        <div onClick={closeModal} className="result"
         style={{display: modalIsOpen ? 'flex' : 'none'}}
         >
            <div className="res-field">
                <span className="close-modal" onClick={closeModal}>&Chi;</span>
                <ul>
                    <li>Valor: <span>{result.Valor}</span> </li>
                    <li>Marca: <span>{result.Marca}</span> </li>
                    <li>Modelo: <span>{result.Modelo}</span> </li>
                    <li>AnoModelo: <span>{result.AnoModelo}</span> </li>
                    <li>Combustivel: <span>{result.Combustivel}</span> </li>
                    <li>CodigoFipe: <span>{result.CodigoFipe}</span> </li>
                    <li>MesReferencia: <span>{result.MesReferencia}</span> </li>
                    <li>SiglaCombustivel: <span>{result.SiglaCombustivel}</span> </li>
                </ul>
            </div>
            </div>
    )
}

export default ResultModal;
