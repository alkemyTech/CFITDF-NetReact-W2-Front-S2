import { useState, useEffect } from "react";
import { transferir, obtenerCuentaPorCliente } from "../../api/OperationsService";
import { useAuth } from "../../context/AuthContext";
import { Card, CardContent } from "../../components/ui/Card";
import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";

const Transfer = () => {
    const { token } = useAuth();

    const [cuenta, setCuenta] = useState<any | null>(null);  // solo una cuenta
    const [destino, setDestino] = useState("");
    const [monto, setMonto] = useState("");
    const [motivo, setMotivo] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
    const [transferenciaEnviada, setTransferenciaEnviada] = useState(false);
    useEffect(() => {
        const fetchCuenta = async () => {
            if (!token) return;
            try {
                const res = await obtenerCuentaPorCliente(token);
                if (res.data && res.data.length > 0) {
                    const b = res.data[0];
                    setCuenta({
                        nroCuenta: b.NroCuenta,
                        cbu: b.CBU,
                        nombre: b.Nombre,
                        apellido: b.Apellido,
                        saldo: b.Saldo
                    });
                } else {
                    setCuenta(null);
                    alert("No se encontró ninguna cuenta asociada al usuario.");
                }
            } catch {
                alert("Error al obtener la cuenta del usuario.");
            }
        };
        fetchCuenta();
    }, [token]);

    const validarDatos = () => {
        if (!destino.trim()) {
            alert("Ingresa un Alias o CBU de destino.");
            return false;
        }
        if (!monto || Number(monto) <= 0) {
            alert("Ingresa un monto válido mayor que cero.");
            return false;
        }
        return true;
    };

    const handleTransferirClick = () => {
        if (validarDatos()) {
            setModalVisible(true);
        }
    };

    const confirmarTransferencia = async () => {
        if (!token) {
            alert("Error: No se encontró un token de autenticación.");
            return;
        }

        if (!cuenta) {
            alert("No hay cuenta disponible para realizar la transferencia.");
            return;
        }

        try {
            const res = await transferir(token, {
                nroCuentaOrigen: cuenta.nroCuenta,  // ahora sí existe
                destino: destino.trim(),
                monto: parseFloat(monto),
            });

            alert(res.data.mensaje || "Transferencia realizada con éxito.");
            setModalVisible(false);
            setTransferenciaEnviada(true);
            setDestino("");
            setMonto("");
            setMotivo("");
        } catch (error: any) {
            const msg = error.response?.data || "Error al realizar la transferencia.";
            alert(typeof msg === "string" ? msg : "Error desconocido.");
        }
    };

    return (
        <div className="p-4">
            <Card className="max-w-md mx-auto">
                <CardContent className="space-y-4 p-6">
                    <h2 className="text-xl font-bold text-center">Transferir dinero</h2>

                    {cuenta ? (
                        <p className="text-sm font-medium text-gray-700">
                            Cuenta de origen:{" "}
                            <span className="font-semibold">
                                {cuenta.nombre} {cuenta.apellido} - {cuenta.CBU}
                            </span>
                        </p>
                    ) : (
                        <p>Cargando cuenta...</p>
                    )}

                    <Input
                        label="Alias o CBU de destino"
                        value={destino}
                        onChange={(e) => setDestino(e.target.value)}
                        placeholder="Ingrese alias o CBU"
                    />

                    <Input
                        label="Monto a transferir"
                        type="number"
                        value={monto}
                        onChange={(e) => setMonto(e.target.value)}
                        placeholder="0.00"
                        min={0}
                    />

                    <Input
                        label="Motivo (opcional)"
                        value={motivo}
                        onChange={(e) => setMotivo(e.target.value)}
                        placeholder="Ingrese motivo de la transferencia"
                    />

                    <Button onClick={handleTransferirClick} className="w-full">
                        Transferir
                    </Button>

                    {modalVisible && (
                        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                            <div className="bg-white rounded p-6 max-w-sm w-full space-y-4">
                                <h3 className="text-lg font-semibold">Confirmar transferencia</h3>
                                <p>
                                    ¿Está seguro? Usted está transfiriendo{" "}
                                    <strong>${parseFloat(monto).toFixed(2)}</strong> hacia{" "}
                                    <strong>{destino}</strong>.
                                </p>
                                {motivo && (
                                    <p>
                                        <em>Motivo:</em> {motivo}
                                    </p>
                                )}
                                <div className="flex justify-end space-x-2">
                                    <Button
                                        onClick={() => setModalVisible(false)}
                                        variant="secondary"
                                    >
                                        Cancelar
                                    </Button>
                                    <Button onClick={confirmarTransferencia}>
                                        Confirmar transferencia
                                    </Button>
                                </div>
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};

export default Transfer;