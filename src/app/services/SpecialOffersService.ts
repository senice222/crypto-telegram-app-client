class SpecialOfferService {
  public setSeen(isSet: boolean): void {
    try {
      localStorage.setItem("isSpecialOfferSeen", String(isSet));
    } catch (error) {
      console.error(error);
    }
  }
  public isSeen(): boolean {
    try {
      const isSet =
        Boolean(localStorage.getItem("isSpecialOfferSeen")) ?? false;
      return isSet;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
}

const specialOfferService = new SpecialOfferService();
export default specialOfferService;
