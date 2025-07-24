export async function getCardInfo(cardNumber: string): Promise<{
  cardNumber: string;
  ownerName: string;
  iban: string;
}> {
  // this is a fake data for test

  return {
    cardNumber,
    ownerName: "احسان موسوی",
    iban: "7898765432345678",
  };
}
