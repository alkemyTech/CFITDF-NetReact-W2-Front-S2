$port = 5173
$proc = Get-NetTCPConnection -LocalPort $port -ErrorAction SilentlyContinue | Select-Object -ExpandProperty OwningProcess -ErrorAction SilentlyContinue

if ($proc) {
    Stop-Process -Id $proc -Force
    Write-Host "Proceso usando puerto $port detenido."
} else {
    Write-Host "No hay ningún proceso usando el puerto $port."
}