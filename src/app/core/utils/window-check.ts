/**
 * Utilitário para verificar se o código está rodando no navegador
 * Evita erros durante SSR ou pré-renderização
 */

export function isBrowserEnvironment(): boolean {
  return typeof window !== 'undefined';
}

export const WindowUtil = {
  /**
   * Retorna o objeto window se estiver em ambiente de navegador ou null caso contrário
   */
  getWindow(): Window | null {
    return isBrowserEnvironment() ? window : null;
  },

  /**
   * Executa uma função apenas se estiver no ambiente do navegador
   * @param callback Função a ser executada no ambiente do navegador
   */
  runIfBrowser(callback: (win: Window) => void): void {
    if (isBrowserEnvironment()) {
      callback(window);
    }
  }
};
