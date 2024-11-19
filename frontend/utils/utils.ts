export function formatNumberToIndianReadble(number: number) {
  let numStr = String(number);

  let parts = numStr.split(".");
  let integerPart = parts[0];
  let decimalPart = parts[1] || "";

  integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  let formattedNumber = decimalPart ? `${integerPart}.${decimalPart}` : integerPart;

  return formattedNumber;
}

export function uppercaseFirstCharacter(inputString: string): string {
  if (inputString.length > 0) {
      return inputString.charAt(0).toUpperCase() + inputString.slice(1);
  } else {
      return '';
  }
}

export function reverseDateString(inputString: string): string {
  return inputString.split("-").reverse().join("-");
}