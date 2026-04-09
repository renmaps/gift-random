const friendlyCode = () => {
  const letters = "ABCDEFGHJKLMNPQRSTUVWXYZ"; // Without 'I', 'O' for better readability
  const numbers = "23456789"; // Without '0', '1'
  
  // 1. Decide how many letters it will have (between 1 and 3)
  const [randomVal] = crypto.getRandomValues(new Uint32Array(1));
  const numLetters = (randomVal! % 3) + 1; 
  const numDigits = 6 - numLetters;

  let codeArray: string[] = [];

  // 2. Generate the letters
  for (let i = 0; i < numLetters; i++) {
    const [r] = crypto.getRandomValues(new Uint32Array(1));
    codeArray.push(letters[r! % letters.length]!);
  }

  // 3. Generate the numbers
  for (let i = 0; i < numDigits; i++) {
    const [r] = crypto.getRandomValues(new Uint32Array(1));
    codeArray.push(numbers[r! % numbers.length]!);
  }

  // 4. Shuffle the array (Fisher-Yates simple) to ensure letters are not always at the beginning
  for (let i = codeArray.length - 1; i > 0; i--) {
    const [r] = crypto.getRandomValues(new Uint32Array(1));
    const j = r! % (i + 1);
    [codeArray[i], codeArray[j]] = [codeArray[j]!, codeArray[i]!];
  }

  return codeArray;
}

export default friendlyCode;
