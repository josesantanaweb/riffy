# Hook `useCoinFlip`

## Descripción
`useCoinFlip` es un hook personalizado que implementa la lógica de un juego de lanzamiento de moneda.  
Permite al usuario apostar una cantidad, elegir cara o cruz, acumular multiplicadores en racha de victorias y gestionar su balance de forma persistente.

---

## Estados principales
- **flipping** (`boolean`) → Indica si la moneda está en animación de giro.
- **selectedAmount** (`number | null`) → Cantidad apostada por el jugador.
- **gameStarted** (`boolean`) → Indica si la partida ha comenzado.
- **choice** (`CoinEnum | null`) → Elección actual del jugador (cara o cruz).
- **result** (`ResultEnum | null`) → Resultado de la última tirada (WIN o LOSE).
- **coinResult** (`CoinEnum`) → Resultado real de la moneda.
- **totalWinnings** (`number`) → Ganancias acumuladas durante la partida.
- **winAmount** (`number`) → Monto ganado en la última tirada.
- **coinHistory** (`CoinEnum[]`) → Historial de resultados de la moneda.
- **multiplierHistory** (`IMultiplierHistory[]`) → Historial de multiplicadores aplicados y su resultado.
- **winStreak** (`number`) → Contador de victorias consecutivas.

---

## Constantes utilizadas
- **BASE_MULTIPLIER** → Multiplicador base para las apuestas.
- **BONUS_PER_WIN** → Bono de multiplicador por cada victoria consecutiva.
- **CoinEnum** → Enumeración con valores posibles: `HEADS` y `TAILS`.
- **ResultEnum** → Enumeración con valores: `WIN` y `LOSE`.

---

## Funciones internas

### `updateBalance(amount: number)`
Actualiza el saldo del jugador sumando o restando el monto indicado.

### `handleStart()`
- Valida la apuesta.
- Descuenta el monto apostado del balance.
- Reinicia variables de estado.
- Reproduce sonido inicial del juego.

### `handleFlip(choice: CoinEnum)`
- Registra la elección del jugador.
- Inicia animación y sonido de lanzamiento.
- Calcula el resultado aleatorio (`getCoinOutcome`).
- Determina si el jugador ganó o perdió.
- Aplica multiplicador si gana, o reinicia el juego si pierde.

### `handleRetire()`
- Guarda el multiplicador final.
- Añade las ganancias al balance del usuario.
- Resetea el juego.

### `resetGame()`
- Restaura el estado inicial del juego.

---

## Retorno del hook
```ts
{
  flipping,
  selectedAmount,
  setSelectedAmount,
  gameStarted,
  choice,
  coinResult,
  result,
  coinHistory,
  multiplier,
  handleFlip,
  handleStart,
  handleRetire,
  totalWinnings,
  winAmount,
  multiplierHistory,
  winStreak,
  resetGame,
  balance,
  setChoice,
}
