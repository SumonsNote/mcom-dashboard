export function convertToWords(number) {
  const ones = [
    "zero",
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
    "ten",
    "eleven",
    "twelve",
    "thirteen",
    "fourteen",
    "fifteen",
    "sixteen",
    "seventeen",
    "eighteen",
    "nineteen",
  ];
  const tens = [
    "",
    "",
    "twenty",
    "thirty",
    "forty",
    "fifty",
    "sixty",
    "seventy",
    "eighty",
    "ninety",
  ];
  const scales = ["", "thousand", "lakh", "crore"];

  function convertGroup(n) {
    if (n === 0) return "";
    else if (n < 20) return ones[n] + " ";
    else if (n < 100)
      return (
        tens[Math.floor(n / 10)] +
        (n % 10 !== 0 ? "-" + ones[n % 10] : "") +
        " "
      );
    else
      return (
        ones[Math.floor(n / 100)] +
        " hundred" +
        (n % 100 !== 0 ? " " + convertGroup(n % 100) : " ")
      );
  }

  if (number === 0) return "zero Taka";

  const integerPart = Math.floor(number);
  const decimalPart = Math.round((number - integerPart) * 100);

  let result = "";
  let scaleIndex = 0;
  let remainingIntegerPart = integerPart;

  while (remainingIntegerPart > 0) {
    if (scaleIndex === 0 || scaleIndex === 2) {
      // Handle hundreds and thousands
      const group = remainingIntegerPart % 1000;
      if (group !== 0) {
        result = convertGroup(group) + scales[scaleIndex] + " " + result;
      }
      remainingIntegerPart = Math.floor(remainingIntegerPart / 1000);
    } else if (scaleIndex === 1 || scaleIndex === 3) {
      // Handle lakhs and crores
      const group = remainingIntegerPart % 100;
      if (group !== 0) {
        result = convertGroup(group) + scales[scaleIndex] + " " + result;
      }
      remainingIntegerPart = Math.floor(remainingIntegerPart / 100);
    }
    scaleIndex++;
  }

  result = result.trim() + " tk";

  // Add decimal part
  if (decimalPart > 0) {
    result += " and " + convertGroup(decimalPart).trim() + " paisa";
  }

  return result + " only";
}
