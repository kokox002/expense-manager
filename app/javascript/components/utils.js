export const currencyFormat = curr => {
    return Number(curr)
        .toFixed(2)
        .replace(/\d(?=(\d{3})+\.)/g, "$&,");
};