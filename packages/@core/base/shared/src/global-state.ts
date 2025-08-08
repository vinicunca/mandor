/**
 * Globally reused variables, components, and configurations are shared between modules
 * Implemented through the singleton mode, the singleton must be careful not to be affected by requests, such as user information that needs to be obtained based on requests. If there is a subsequent SSR requirement, it will not be affected
 */

interface ComponentsState {
  [key: string]: any;
}

interface MessageState {
  copyPreferencesSuccess?: (params: { title: string; content?: string }) => void;
}

class GlobalShareState {
  #components: ComponentsState = {};
  #message: MessageState = {};

  /**
   * Define message prompts for each scene within the framework
   */
  public defineMessage({ copyPreferencesSuccess }: MessageState) {
    this.#message = {
      copyPreferencesSuccess,
    };
  }

  public getComponents(): ComponentsState {
    return this.#components;
  }

  public getMessage(): MessageState {
    return this.#message;
  }

  public setComponents(value: ComponentsState) {
    this.#components = value;
  }
}

export const globalShareState = new GlobalShareState();
