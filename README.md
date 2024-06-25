# Documentación

## .env
Este debe incluir:

```
VITE_BACKEND_URL= BASE_URL_BACK
```

## Endpoints de Usuario
Para probar estos endpoints, se deben crear nuevos usuarios, y realizar login y logout con estos.
Para crear un nuevo usuario, la contraseña debe incluir una letra, un número y un carácter especial. Además el mail debe ser distinto al de el resto de usuarios creados.
La página ofrece ciertos label en función del estado del usuario (si se logueo o no).

## Endpoints partida
*Para probar los endpoints es escencial utilizar los seeders, esto para facilitar la corrección ya que la gamesession con los 4 jugadores ya está creada*

*El seeder tiene un juego donde 2 jugadores tienen desactivaciones, uno tiene 1 y otro tiene 2*

*SOLO FUNCIONAN LOS BOTONES DE LA SECCIÓN DE ENDPOINTS, los del tablero son estaticos por el momento ya que los funcionales se pusieron en la sección de endpoints.

Para los endpoints de la partida se implementó un sistema de botones (algunos reciben inputs) debajo del tablero de juego, que realizan llamadas a la API. Luego, la respuesta se muestra debajo en una sección llamada "API responses" como un texto en formato JSON. 

Al mismo tiempo, se puede evidenciar los cambios al juego en el mismo talero al realizar una llamada al endpoint /game/1/info. Para esto se puede utilizar el botón GET info o recargar la página.

La documentación del uso de estos endpoints se encuentra en el repositorio de backend.

## Cambio de Reglas
Al momento de explotar o ser desactivada, la bomba cambiará a un jugador aleatorio (menos el que ya tenía la bomba).

Lanzar una bomba cuesta 6 monedas.

La desactivación se puede utilizar si es que tu tienes la bomba y esta debe explotar en ese mismo turno. Si no tienes descativaciones libres o decides no utilizarlas la bomba explota y te devolverá al inicio.

Se ganan 3 monedas por turno.

## Decisiones de Diseño
El diseño de la página es muy similar al mockup, con cambios muy menores, por ejemplo el nombre de usuario que se muestra cuando se está logeado.


