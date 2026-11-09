/*
 * Whether the visitor is signed in. There are no accounts yet (Log in and Get started are
 * honest placeholders), so nobody is ever signed in. When real authentication exists,
 * replace this with the actual session lookup; the public header and footer already
 * switch on it (Dashboard link, Open Dashboard button, and account menu appear only
 * when it is true).
 */
export function isSignedIn(): boolean {
  return false;
}
