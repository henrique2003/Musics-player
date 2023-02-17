export function validEmptyField(field: string): boolean {
  if (!field || field.trim() === '') {
    return false
  }

  return true
}
