export const normalizeCompanyName = (name) => {
  if (!name || typeof name !== "string") return null;
  return name.trim();
};

export const normalizeLocations = (location) => {
  if (!Array.isArray(location)) {
    throw new Error("Location must be an array of strings");
  }

  const normalized = [
    ...new Set(
      location
        .map((loc) => loc.trim().toLowerCase())
        .filter((loc) => loc.length >= 2 && loc.length <= 100)
    ),
  ];

  if (normalized.length === 0) {
    throw new Error("At least one valid location is required");
  }

  return normalized;
};
