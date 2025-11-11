interface MediaTrackCapabilities {
  focusMode?: string[];
  zoom?: DoubleRange;
}

interface MediaTrackConstraints {
  focusMode?: ConstrainDOMString;
  advanced?: { zoom?: number }[];
}