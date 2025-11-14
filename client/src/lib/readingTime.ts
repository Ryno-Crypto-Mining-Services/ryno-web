/**
 * Calculate estimated reading time for text content
 * @param text - The text content to analyze
 * @param wordsPerMinute - Average reading speed (default: 200 wpm)
 * @returns Estimated reading time in minutes
 */
export function calculateReadingTime(text: string, wordsPerMinute: number = 200): number {
  // Remove markdown syntax and HTML tags for accurate word count
  const cleanText = text
    .replace(/[#*_~`]/g, '') // Remove markdown formatting
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Convert markdown links to text
    .trim();
  
  // Count words (split by whitespace)
  const words = cleanText.split(/\s+/).filter(word => word.length > 0);
  const wordCount = words.length;
  
  // Calculate reading time in minutes (minimum 1 minute)
  const minutes = Math.ceil(wordCount / wordsPerMinute);
  return Math.max(1, minutes);
}

/**
 * Format reading time as a human-readable string
 * @param minutes - Reading time in minutes
 * @returns Formatted string (e.g., "5 min read")
 */
export function formatReadingTime(minutes: number): string {
  return `${minutes} min read`;
}

/**
 * Calculate and format reading time in one step
 * @param text - The text content to analyze
 * @param wordsPerMinute - Average reading speed (default: 200 wpm)
 * @returns Formatted reading time string
 */
export function getReadingTime(text: string, wordsPerMinute: number = 200): string {
  const minutes = calculateReadingTime(text, wordsPerMinute);
  return formatReadingTime(minutes);
}
