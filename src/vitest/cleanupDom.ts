import { afterEach } from 'vitest';

afterEach(clean);

function clean() {
  // Clear document body if anything is in it
  if (document.body.children.length > 0) {
    document.body.innerHTML = '';
  }
}
