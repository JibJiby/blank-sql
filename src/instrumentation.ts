export async function register() {
  // just one-time polyfill
  await import('./server/container/server-container')
}
