/**
 * Remove and destroy loading
 * Put it here instead of in the app tag of index.html because it is less abrupt and may flicker if rendered too quickly
 * Improve the experience by adding CSS animation to hide it first and then removing the loading node after the animation
 * The downside is that it will increase the amount of code.
 */
export function unmountGlobalLoading() {
  const loadingElement = document.querySelector('#__app-loading__');

  if (loadingElement) {
    // Add hidden class to trigger transition animation
    loadingElement.classList.add('hidden');

    // Find all injected loading elements that need to be removed
    const injectLoadingElements = document.querySelectorAll(
      '[data-app-loading^="inject"]',
    );

    // When the transition animation ends, remove the loading element and all injected loading elements
    loadingElement.addEventListener(
      'transitionend',
      () => {
        loadingElement.remove();
        injectLoadingElements.forEach((el) => {
          el.remove();
        });
      },
      { once: true },
    );
  }
}
