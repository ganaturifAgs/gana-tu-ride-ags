@echo off
echo Abriendo puertos 8080 y 443 en el Firewall de Windows...

:: Reglas de entrada
netsh advfirewall firewall add rule name="Entrada TCP 8080" dir=in action=allow protocol=TCP localport=8080
netsh advfirewall firewall add rule name="Entrada TCP 443" dir=in action=allow protocol=TCP localport=443

:: Reglas de salida
netsh advfirewall firewall add rule name="Salida TCP 8080" dir=out action=allow protocol=TCP localport=8080
netsh advfirewall firewall add rule name="Salida TCP 443" dir=out action=allow protocol=TCP localport=443

echo Reglas aplicadas correctamente.
pause