export function generateCode() {
    let result: string = "";
  
    const characters: string =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const suffix: string = "2024RRS";
    const charactersLength: number = 10;
  
    for (let i: number = 0; i < charactersLength; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
  
    return `${result}${suffix}`;
  }
  