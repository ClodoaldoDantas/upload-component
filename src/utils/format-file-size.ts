export function formatFileSize(bytes: number) {
  if (bytes < 1024) {
    return bytes + ' bytes'
  }

  if (bytes < 1024 * 1024) {
    return (bytes / 1024).toFixed(1) + ' KB'
  }

  if (bytes < 1024 * 1024 * 1024) {
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
  }

  if (bytes < 1024 * 1024 * 1024 * 1024) {
    return (bytes / (1024 * 1024 * 1024)).toFixed(1) + ' GB'
  }

  return (bytes / (1024 * 1024 * 1024 * 1024)).toFixed(1) + ' TB'
}
