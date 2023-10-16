export async function register() {
  // just one-time polyfill
  await import('./server/polyfill/reflect-metadata')
}
