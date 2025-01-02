import { Controller } from "@hotwired/stimulus";

export default class UIRangeSliderController extends Controller {
  static targets = ["thumb1", "thumb2", "range", "label1", "label2"];
  static values = { min: Number, max: Number };

  connect() {
    this.updateUI();
  }

  updateUI() {
    let thumb1Value = parseInt(this.thumb1Target.value, 10);
    let thumb2Value = parseInt(this.thumb2Target.value, 10);

    // Ensure thumbs are constrained
    if (thumb1Value > thumb2Value) {
      [thumb1Value, thumb2Value] = [thumb2Value, thumb1Value];
    }

    const range = this.maxValue - this.minValue;
    const thumb1Percent = ((thumb1Value - this.minValue) / range) * 100;
    const thumb2Percent = ((thumb2Value - this.minValue) / range) * 100;

    // Update labels
    this.label1Target.style.left = `${thumb1Percent}%`;
    this.label1Target.textContent = thumb1Value;

    this.label2Target.style.left = `${thumb2Percent}%`;
    this.label2Target.textContent = thumb2Value;

    // Update range colour between thumbs
    this.rangeTarget.style.left = `${thumb1Percent}%`;
    this.rangeTarget.style.width = `${thumb2Percent - thumb1Percent}%`;
}

  thumb1Changed() {
    this.updateUI();
  }

  thumb2Changed() {
    this.updateUI();
  }
}
