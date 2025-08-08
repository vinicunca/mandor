export class StateHandler {
  private condition: boolean = false;
  private rejectCondition: (() => void) | null = null;
  private resolveCondition: (() => void) | null = null;

  isConditionTrue(): boolean {
    return this.condition;
  }

  reset() {
    this.condition = false;
    this.clearPromises();
  }

  // Trigger reject when the condition is false
  setConditionFalse() {
    this.condition = false;
    if (this.rejectCondition) {
      this.rejectCondition();
      this.clearPromises();
    }
  }

  // Trigger resolve when the condition is true
  setConditionTrue() {
    this.condition = true;
    if (this.resolveCondition) {
      this.resolveCondition();
      this.clearPromises();
    }
  }

  // Return a Promise that waits for the condition to become true
  waitForCondition(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.condition) {
        resolve(); // If the condition is already true, resolve immediately
      } else {
        this.resolveCondition = resolve;
        this.rejectCondition = reject;
      }
    });
  }

  // Clear resolve/reject functions
  private clearPromises() {
    this.resolveCondition = null;
    this.rejectCondition = null;
  }
}
