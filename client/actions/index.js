export const SAMPLE_ACTION = 'SAMPLE_ACTION';

// asyncrounous function to get or post data to server

// here are action creaters
export const sampleAction = newState => ({
  type: SAMPLE_ACTION,
  open: newState,
});
