/**
 * Optimizes a Cloudinary image URL dynamically by injecting auto-format,
 * auto-quality, and max-width scaling constraints.
 * 
 * @param {string} url - The original Cloudinary secure URL
 * @param {number} width - Max width constraint (defaults to 800)
 * @returns {string} The optimized Cloudinary URL
 */
export function getOptimizedImageUrl(url, width = 800) {
  if (!url || !url.includes('cloudinary.com')) return url
  return url.replace('/upload/', `/upload/f_auto,q_auto,w_${width},c_limit/`)
}
