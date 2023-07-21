/**
 * Author: Claude Fassinou (dev.claudy@gmail.com)
 * License: MIT (2023)
 *
 * Class Holorgue represents a clock with hour, minute, and second hands.
 * It updates the position of the hands every second to reflect the current time.
 */
class Holorgue {
  start_degre = -90;
  seconde_hand_id = "second-hand";
  minute_hand_id = "minute-hand";
  hour_hand_id = "hour-hand";

  constructor() {}

  /**
   * Runs the Holorgue clock by initializing the clock hands and updating them every second.
   */
  run() {
    // Initialize the clock hands
    this.initClockHand(this.seconde_hand_id, 6);
    this.initClockHand(this.minute_hand_id, 6);
    this.initClockHand(this.hour_hand_id, 30);

    // Update the clock hands every second
    setInterval(() => {
      this.updateBySecond();
    }, 1000);
  }

  /**
   * Initializes the specified clock hand's position.
   * @param handId - The ID of the clock hand element.
   * @param degreeIncrement - The degree increment for each unit of time (seconds, minutes, or hours).
   */
  private initClockHand(handId: string, degreeIncrement: number) {
    const hand = document.getElementById(handId);
    if (hand) {
      let currentDegree = this.start_degre;

      if (handId === this.seconde_hand_id) {
        currentDegree += new Date().getSeconds() * degreeIncrement;
      } else if (handId === this.minute_hand_id) {
        currentDegree += new Date().getMinutes() * degreeIncrement;
      } else if (handId === this.hour_hand_id) {
        const currentDate = new Date();
        currentDegree +=
          (currentDate.getHours() % 12) * degreeIncrement +
          currentDate.getMinutes() / 2;
      }

      // Set the initial transform property to rotate the hand to its correct position
      hand.style.transform = `rotate(${currentDegree}deg)`;
    }
  }

  /**
   * Updates the positions of the clock hands to reflect the current time.
   */
  private updateBySecond() {
    const secondHand = document.getElementById(this.seconde_hand_id);
    const minuteHand = document.getElementById(this.minute_hand_id);
    const hourHand = document.getElementById(this.hour_hand_id);

    if (secondHand && minuteHand && hourHand) {
      const now = new Date();
      let seconds = now.getSeconds();
      let minutes = now.getMinutes();
      let hours = now.getHours() % 12;

      // Calculate the degrees for each clock hand
      let secondHandDegree = this.start_degre + seconds * 6;
      let minuteHandDegree = this.start_degre + minutes * 6;
      let hourHandDegree = this.start_degre + hours * 30 + minutes / 2;

      // Set the transform property to rotate the clock hands to their new positions
      secondHand.style.transform = `rotate(${secondHandDegree}deg)`;
      minuteHand.style.transform = `rotate(${minuteHandDegree}deg)`;
      hourHand.style.transform = `rotate(${hourHandDegree}deg)`;
    }
  }
}

// Create a new Holorgue clock and run it
new Holorgue().run();
