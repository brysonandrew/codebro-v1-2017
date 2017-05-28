export const nameToPath =
    (name) =>
        name.replace(/-/g, "")
            .replace(/\s/g, "-")
            .replace(/[.,]/g, "")
            .toLowerCase();