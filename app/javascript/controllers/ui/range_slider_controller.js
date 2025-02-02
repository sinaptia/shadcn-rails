import { Controller } from "@hotwired/stimulus";

export default class UIRangeSliderController extends Controller {
  static targets = ["thumb1", "thumb2", "range", "label1", "label2"];
  static values = { min: Number, max: Number };

  connect() {
    this.updateUI();
  }

  updateUI() {
    const thumb1Value = parseInt(this.thumb1Target.value, 10);
    const thumb2Value = parseInt(this.thumb2Target.value, 10);

    // Update labels
    this.label1Target.style.left = `${this.calculatePercentage(thumb1Value)}%`;
    this.label1Target.textContent = thumb1Value;

    this.label2Target.style.left = `${this.calculatePercentage(thumb2Value)}%`;
    this.label2Target.textContent = thumb2Value;

    // Update range track
    this.rangeTarget.style.width = `${this.calculatePercentage(thumb2Value - thumb1Value)}%`;
    this.rangeTarget.style.left = `${this.calculatePercentage(thumb1Value)}%`;
  }

  calculatePercentage(value) {
    const minValue = this.hasMinValue ? this.minValue : 0;
    const maxValue = this.hasMaxValue ? this.maxValue : 100;
    const range = maxValue - minValue;
    return ((value - minValue) / range) * 100;
  }

  thumb1Changed() {
    const thumb1Value = parseInt(this.thumb1Target.value, 10);
    const thumb2Value = parseInt(this.thumb2Target.value, 10);

    if (thumb1Value >= thumb2Value) {
      this.thumb1Target.value = thumb2Value - 1;
    }

    this.updateUI();
  }

  thumb2Changed() {
    const thumb1Value = parseInt(this.thumb1Target.value, 10);
    const thumb2Value = parseInt(this.thumb2Target.value, 10);

    if (thumb2Value <= thumb1Value) {
      this.thumb2Target.value = thumb1Value + 1;
    }

    this.updateUI();
  }
}
