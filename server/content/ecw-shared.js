import { choice, figure, lesson, prose, textEx } from "./factory.js";

export const scribePicture = figure(
  "/ecw/scribe-devices.png",
  "eClinicalWorks product picture showing Scribe on a phone and a Progress Note on a laptop, including the top jellybean band, Scribe It, and the note sections.",
  "Published by eClinicalWorks on their speech-recognition page. The patient on the screen is their demo, not someone at APICO. Button names in your V12 build can differ. Hover the control and read the name your screen shows."
);

export const phonePicture = figure(
  "/ecw/scribe-phone.png",
  "eClinicalWorks product picture of the phone Scribe screen, with Scribe It, Last Text, a microphone, and Use Template.",
  "The same vendor picture, cropped to the phone. Scribe It is the button at the top right. Last Text recalls the previous dictation. The microphone is the round control at the bottom."
);

export const billingPicture = figure(
  "/ecw/rcm-devices.png",
  "eClinicalWorks product picture of a revenue analysis board on a tablet and a week-in-review board on a phone.",
  "Published by eClinicalWorks on their revenue-cycle page. The practice name on the screen is their demo. This is the summary board, not the claim inside one visit."
);

export function course(sequence, trackTitle) {
  return (spec) =>
    lesson({
      sequence,
      trackTitle,
      hours: "4 hours",
      record: "Practice on a training patient. Do not open a real APICO chart for these exercises, and do not paste a chart into this studio.",
      weekPlan: [
        "Hour 1. Read the lesson with eClinicalWorks closed. Write the screen name and where it sits.",
        "Hour 2. Trace the worked example on paper and point at the same place on the picture.",
        "Hour 3. On a training patient, open that screen. If your label differs, write the label your build uses.",
        "Hour 4. Submit both exercises.",
      ],
      ...spec,
    });
}

export { choice, prose, textEx };
