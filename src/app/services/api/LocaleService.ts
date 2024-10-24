class LocaleService {
  public setLocale(isSet: boolean): void {
    try {
      localStorage.setItem("isLocaleSet", String(isSet));
    } catch (error) {
      console.error(error);
    }
  }
  public isLocaleSet(): boolean {
    try {
      const isSet = Boolean(localStorage.getItem("isLocaleSet")) ?? false;
      return isSet;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
}

const localeService = new LocaleService();
export default localeService;
