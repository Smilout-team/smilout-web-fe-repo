export function removeVietnameseTones(str: string) {
  return str
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D');
}

export function normalizeSearchString(str: string) {
  return removeVietnameseTones(str.trim().replace(/\s+/g, ' ').toLowerCase());
}
