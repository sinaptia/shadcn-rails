import { Controller } from "@hotwired/stimulus";

export default class UITimePickerController extends Controller {
  static targets = ["time", "hour", "minutes", "ampm"];

  connect() {
    this.handleTimeChange();
  }

  handleTimeChange() {
    let time = this.timeTarget.value;
    let isTimeValid = this.validateTime(time);
    if (isTimeValid) {
      let timeArray = time.split(" ");
      let timeValue = timeArray[0].split(":");
      let hour = timeValue[0];
      let minutes = timeValue[1];
      let ampm = timeArray[1];

      this.hourTarget.value = hour;
      this.minutesTarget.value = minutes;
      this.ampmTarget.value = ampm;
    }
  }

  validateTime(time) {
    let isTimeValid = /^(0[1-9]|1[0-2]):([0-5][0-9])\s?(am|pm)$/i.test(time);
    return isTimeValid;
  }

  formatTime(hour, minutes, ampm) {
    let time = `${hour}:${minutes} ${ampm}`;
    return time;
  }

  validateAndinsertTime(number) {
    let value = number.replace(/[^0-9.]/g, ""); // Ensure only numbers are entered
    let displayValue = "00";

    if (value.length === 1) {
      displayValue = "0" + value;
    } else if (value.length >= 2) {
      // For two digits, slice to the last two digits
      displayValue = value.slice(-2);
    }

    return displayValue;
  }

  handleHourChange(event) {
    let displayValue = this.validateAndinsertTime(event.target.value);

    if (displayValue < 1) {
      displayValue = "01";
    }

    if (displayValue > 12) {
      displayValue = "12";
    }

    this.hourTarget.value = displayValue;

    this.timeTarget.value = this.formatTime(
      this.hourTarget.value,
      this.minutesTarget.value,
      this.ampmTarget.value,
    );
  }

  handleMinutesChange(event) {
    let displayValue = this.validateAndinsertTime(event.target.value);

    if (displayValue > 59) {
      displayValue = "59";
    }

    if (displayValue < 0) {
      displayValue = "00";
    }

    this.minutesTarget.value = displayValue;

    this.timeTarget.value = this.formatTime(
      this.hourTarget.value,
      this.minutesTarget.value,
      this.ampmTarget.value,
    );
  }

  handleAmpmChange() {
    this.timeTarget.value = this.formatTime(
      this.hourTarget.value,
      this.minutesTarget.value,
      this.ampmTarget.value,
    );
  }
}
