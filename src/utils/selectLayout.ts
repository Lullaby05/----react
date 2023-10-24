export const selectLayout = (pathName: string): string => {
  return pathName.includes('/users') ? 'LoginLayout': 'BaseLayout'
}