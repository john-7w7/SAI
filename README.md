# SAI 

## Estructura SAI:

- partials/  (head, navbar, footer, scripts)
- assets/css/global.css  -> TODO lo compartido.
- assets/css/<pagina>.css -> SOLO lo específico de cada página con su respoectivo hipervehiculo.
- assets/js/<pagina>.js

## Cómo usar (Cualquier sistema de copilar entorno de desarrollo local) :

1) Copia la carpeta `SAI` a `C:\laragon\www\`
2) Abre: http://localhost:8080/SAI/inicio.php

## Regla
En cada página solo se carga:
- global.css (desde partials/head.php)
- su <pagina>.css (desde la misma página)

- Todo con finalidad de volver a estructurar para tener una limpia y prefecional pilares y estructuras.

deploy fix 