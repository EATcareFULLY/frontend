export const achievementBadgePath = (name, level) => {
    const formattedName = name
        .toLowerCase()
        .replace(/\s+/g, '_')
        .replace(/[^a-z0-9_]/g, '')
        .replace(/^_+|_+$/g, '');
    const formattedLevel = level.toLowerCase();
    return require(`../assets/achivement-badges/${formattedLevel}_${formattedName}.svg`);
};