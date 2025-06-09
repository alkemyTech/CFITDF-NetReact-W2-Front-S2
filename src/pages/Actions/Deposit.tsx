import { transferir, obtenerMisCuentas } from "../../api/OperationsService"; 

const Deposit = () => {
    return (
        <form>
            <h3>Ingresar dinero</h3>
            <input type="number" placeholder="Monto" />
            <button type="submit">Ingresar</button>
        </form>
    );
};

export default Deposit;