import { Servidor } from './servidor';

async function main() {
    const server = new Servidor();
    await server.start();
}

main();