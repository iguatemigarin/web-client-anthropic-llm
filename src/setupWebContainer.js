// This script will be used to set up the WebContainer and start the proxy server.
import { WebContainer } from '@webcontainer/api';

export async function setupProxyServer() {
  try {
    // Boot the WebContainer
    const container = await WebContainer.boot({
      // Options for booting the WebContainer, if any
    });

    // Mount the proxy server script
    await container.mount({
      '/proxyServer.js': new Uint8Array(await (await fetch('/proxyServer.js')).arrayBuffer())
    });

    // Spawn the proxy server process
    await container.spawn('node', ['/proxyServer.js']);

    console.log('Proxy server has been set up successfully.');
  } catch (error) {
    console.error('Error setting up the proxy server:', error);
    throw error; // Re-throw the error to be handled by the caller
  }
}