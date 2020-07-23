import store from "../store";
// import ru from "../locales/ru.json";
// import en from "../locales/en.json";

const locales = {
  "ru-RU": {
    "ProfileTitle": "Профиль"
  },
  "en_US": {
    "ProfileTitle": "Profile"
  },
};

export default function localizeFilter(key) {
  const locale = store.getters.info.locale || "ru-RU";
  console.log('locales',locales)
  console.log('locale',locale)
  return locales[locale][key] || `[Localize error]: key ${key} not found`;
}
