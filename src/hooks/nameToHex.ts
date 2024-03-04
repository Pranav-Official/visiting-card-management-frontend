function nameToColor(name: string): string {
  const colors: string[] = [
    '7B4B94',
    '854D27',
    '9D44B5',
    'E71D36',
    'FF1654',
    '072AC8',
    '1C7293',
    '058C42',
  ];

  // Convert name to a hash value
  const hashValue: number = hashString(name);
  // Map hash value to an index within the range of colors
  const index: number = Math.abs(hashValue) % colors.length;
  return '#' + colors[index];
}

// Simple string hash function
function hashString(str: string): number {
  let hash: number = 0;
  for (let i: number = 0; i < str.length; i++) {
    const char: number = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
}

export default nameToColor;
