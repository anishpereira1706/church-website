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

/**
 * Compresses an image file in the browser using HTML5 Canvas.
 * Resizes the image to a maximum width/height and saves it as a compressed JPEG.
 * 
 * @param {File} file - The original File object from <input type="file">
 * @param {number} maxDimension - Maximum width/height boundary (default 2000px)
 * @param {number} quality - JPEG quality compression ratio (0.0 to 1.0, default 0.8)
 * @returns {Promise<File>} A promise resolving to the compressed File object
 */
export function compressImage(file, maxDimension = 2000, quality = 0.8) {
  return new Promise((resolve, reject) => {
    // If it's not a browser file or not an image, skip
    if (!file || !file.type.startsWith('image/')) {
      resolve(file)
      return
    }

    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = (event) => {
      const img = new Image()
      img.src = event.target.result
      img.onload = () => {
        const canvas = document.createElement('canvas')
        let width = img.width
        let height = img.height

        // Apply max dimension constraint while preserving aspect ratio
        if (width > height) {
          if (width > maxDimension) {
            height = Math.round((maxDimension / width) * height)
            width = maxDimension
          }
        } else {
          if (height > maxDimension) {
            width = Math.round((maxDimension / height) * width)
            height = maxDimension
          }
        }

        canvas.width = width
        canvas.height = height

        const ctx = canvas.getContext('2d')
        ctx.drawImage(img, 0, 0, width, height)

        canvas.toBlob(
          (blob) => {
            if (!blob) {
              resolve(file) // Fallback to original on failure
              return
            }
            // Retain original name, convert to jpeg extension if needed
            const newName = file.name.replace(/\.[^/.]+$/, "") + ".jpg"
            const compressedFile = new File([blob], newName, {
              type: 'image/jpeg',
              lastModified: Date.now()
            })
            resolve(compressedFile)
          },
          'image/jpeg',
          quality
        )
      }
      img.onerror = () => resolve(file)
    }
    reader.onerror = () => resolve(file)
  })
}
