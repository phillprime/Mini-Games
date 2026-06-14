export interface Game {
  id: string;
  title: string;
  gameLink: string;
  imageLink: string;
}

export type ScreenType = 'LOADING' | 'DASHBOARD' | 'WEBVIEW' | 'MENU';

export interface DeveloperInfo {
  packageName: string;
  appName: string;
  tagline: string;
}
