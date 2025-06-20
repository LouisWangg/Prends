const trimmingDash = (location) => {
  return location?.trim().replace(/\s*-\s*/g, " - ");
};

export default trimmingDash;
