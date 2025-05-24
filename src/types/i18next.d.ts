import 'i18next';

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'translation';
    resources: {
      translation: {
        home: string;
        rooms: string;
        access: string;
        contact: string;
        theme: string;
        language: string;
        menu: string;
      };
    };
  }
}
