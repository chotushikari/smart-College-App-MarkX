export const formatDateTime = (date) => {
    return date.toLocaleString("en-IN", {
      dateStyle: "short",
      timeStyle: "short",
      hour12: true,
    });
  };
  