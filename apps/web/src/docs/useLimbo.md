# Hook `useLimbo`

Este hook de React, `useLimbo`, maneja la lógica central del juego Limbo. Permite a los usuarios establecer un multiplicador objetivo o una probabilidad de ganar, realizar apuestas y ver los resultados de cada ronda, incluyendo animaciones y un historial de juego.

---

## **Estados principales**

* **`targetMultiplier`** (`number`): El multiplicador que el jugador intenta alcanzar o superar.
* **`winChancePercentage`** (`number`): La probabilidad de ganar, calculada en función del multiplicador objetivo y la ventaja de la casa.
* **`betAmount`** (`number`): La cantidad de dinero que el jugador apuesta en la ronda actual.
* **`gameStarted`** (`boolean`): Un indicador que es `true` mientras una ronda está en progreso.
* **`resultMultiplier`** (`number | null`): El multiplicador real obtenido en la ronda después de que se determina el resultado. Es `null` si no hay un resultado aún.
* **`animatedMultiplier`** (`string`): El valor del multiplicador que se muestra con una animación gradual en la interfaz de usuario durante la revelación del resultado.
* **`result`** (`ResultEnum | null`): El resultado de la ronda, ya sea `ResultEnum.WIN` o `ResultEnum.LOSE`. Es `null` al inicio de una nueva ronda.
* **`profitAmount`** (`number`): La ganancia neta o la pérdida de la ronda. Si se pierde, es `0`.
* **`multiplierHistory`** (`IMultiplierHistory[]`): Un array que mantiene un registro de los multiplicadores obtenidos y los resultados de las rondas anteriores.
* **`isWinModalVisible`** (`boolean`): Un estado booleano que controla la visibilidad de una ventana modal que se muestra cuando el jugador gana.

---

## **Constantes utilizadas**

Las siguientes constantes se importan para configurar el comportamiento del juego:

* **`ANIMATION_DURATION`**: Duración en milisegundos de la animación del multiplicador.
* **`DEFAULT_DISPLAY_VALUE`**: El valor del multiplicador que se muestra por defecto en la UI.
* **`DEFAULT_MULTIPLIER`**: El valor del multiplicador objetivo inicial.
* **`DEFAULT_WIN_CHANCE`**: La probabilidad de ganar inicial.
* **`HOUSE_EDGE`**: El porcentaje de ventaja que tiene la casa en el juego.
* **`MAX_MULTIPLIER`**: El valor máximo que el multiplicador puede alcanzar.
* **`MAX_WIN_CHANCE`**: La probabilidad de ganar máxima permitida.
* **`WIN_MODAL_TIMEOUT`**: El tiempo en milisegundos que permanece visible la ventana modal de victoria.

---

## **Funciones internas y lógica**

### `useEffect` para la animación del multiplicador

Este `useEffect` se encarga de animar el `animatedMultiplier` desde su valor actual hasta el `resultMultiplier` una vez que se determina un resultado, creando un efecto visual dinámico. Si el juego acaba de comenzar (`gameStarted` es `true`) y aún no hay un `resultMultiplier`, simplemente establece el `animatedMultiplier` al `targetMultiplier`.

### `useEffect` para reiniciar el estado post-resultado

Después de que una ronda termina (ya sea `WIN` o `LOSE`), este `useEffect` reinicia el `animatedMultiplier` al `DEFAULT_DISPLAY_VALUE` y resetea los estados de `result` y `resultMultiplier` después de un breve retraso, preparando el juego para la siguiente ronda.

### **`calculateMultiplier(chance: number)`**

Calcula el multiplicador objetivo (`targetMultiplier`) basado en una `chance` (probabilidad de ganar) dada. La fórmula considera la ventaja de la casa (`HOUSE_EDGE`) para asegurar un juego justo. Si la `chance` es `0`, devuelve el `MAX_MULTIPLIER`.

### **`calculateWinChance(mult: number)`**

Determina la `winChancePercentage` (probabilidad de ganar) a partir de un `mult` (multiplicador objetivo) dado. También incorpora la `HOUSE_EDGE` en su cálculo. Si el `mult` es `0`, devuelve el `MAX_WIN_CHANCE`.

### **`startRound()`**

Esta función inicia una nueva ronda de Limbo. Realiza las siguientes acciones:

* Verifica que se haya establecido un `betAmount` y que el `balance` del jugador sea suficiente para cubrir la apuesta. Si no, la función se detiene.
* Establece `gameStarted` a `true`.
* Reinicia `result` y `resultMultiplier` a `null`.
* Establece `profitAmount` inicialmente al valor de la apuesta (como una pérdida potencial).
* Ajusta el `balance` del jugador restando el `betAmount`.

### **`getPayoutMultiplier()`**

Genera un multiplicador aleatorio que representa el resultado real del juego. Utiliza `Math.random()` y aplica la `HOUSE_EDGE` para simular la mecánica del juego. Asegura que el multiplicador no exceda el `MAX_MULTIPLIER`.

### **`executeBet()`**

Esta función se encarga de la lógica principal de la apuesta y la determinación del resultado:

* Llama a `getPayoutMultiplier()` para obtener el multiplicador real de la ronda.
* Determina si el jugador ganó (`isWin`) comparando el `nextMultiplier` con el `targetMultiplier`.
* Establece el `resultMultiplier` con el valor obtenido.
* Usa un `setTimeout` con `ANIMATION_DURATION` para permitir que la animación del multiplicador se complete antes de mostrar el resultado final.
* Si `isWin` es `true`:
    * Calcula la `totalPayout`.
    * Establece `result` a `ResultEnum.WIN`.
    * Actualiza `profitAmount` con la ganancia neta.
    * Muestra la ventana modal de victoria (`setIsWinModalVisible(true)`).
    * Añade el resultado al `multiplierHistory` (multiplicador y `ResultEnum.WIN`).
    * Ajusta el `balance` del jugador sumando la `totalPayout`.
    * Programa el ocultamiento de la ventana modal de victoria después de `WIN_MODAL_TIMEOUT`.
* Si `isWin` es `false`:
    * Establece `result` a `ResultEnum.LOSE`.
    * Establece `profitAmount` a `0`.
    * Añade el resultado al `multiplierHistory` (multiplicador y `ResultEnum.LOSE`).
* Finalmente, establece `setGameStarted(false)` para indicar que la ronda ha terminado.

### **`handleBet()`**

Es la función principal para iniciar una apuesta. Si el juego no ha comenzado (`!gameStarted`), primero llama a `startRound()` y luego ejecuta `executeBet()`.

### **`setTargetMultiplierAndChance(value: number)`**

Actualiza el `targetMultiplier` al `value` proporcionado y recalcula automáticamente el `winChancePercentage` correspondiente.

### **`setWinChanceAndMultiplier(value: number)`**

Actualiza la `winChancePercentage` al `value` proporcionado y recalcula automáticamente el `targetMultiplier` correspondiente.

---

## **Valores derivados**

* **`isBalanceInsufficient`** (`boolean`): Es `true` si el saldo del jugador es `0` o si el `betAmount` es mayor que el `balance` disponible.
* **`buttonBetDisabled`** (`boolean`): Es `true` si el botón de apostar debe estar deshabilitado, lo cual ocurre si el juego ya ha comenzado (`gameStarted`), si no hay un `betAmount` establecido, o si el `balance` es insuficiente.

---

## **Retorno del hook**

El hook `useLimbo` devuelve un objeto que contiene todos los estados, valores derivados y funciones necesarias para interactuar con la lógica del juego Limbo desde un componente de React:

```typescript
{
  // Estados y valores
  targetMultiplier,
  winChancePercentage,
  betAmount,
  setBetAmount,
  gameStarted,
  resultMultiplier,
  animatedMultiplier,
  result,
  profitAmount,
  multiplierHistory,
  balance,
  // Derivados
  isBalanceInsufficient,
  buttonBetDisabled,
  // Acciones
  handleBet,
  setTargetMultiplierAndChance,
  setWinChanceAndMultiplier,
  // UI
  isWinModalVisible,
}
