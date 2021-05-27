import {CosmosClient} from '@azure/cosmos';

function sleep(ms: number) {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
}

async function main() {
  let counter = 0;
  while (true) {
    try {
      const client = new CosmosClient({
        endpoint: process.env.COSMOS_ENDPOINT!,
        key: process.env.COSMOS_KEY!,
      });

      const {database} = await client.databases.createIfNotExists({
        id: 'db1',
      });
      const {container} = await database.containers.createIfNotExists({
        id: 'container1',
      });

      await container.items.upsert({
        id: counter.toString(),
        category: 'Personal',
        name: 'groceries',
        description: 'Pick up apples and strawberries.',
        isComplete: false,
      });

      const {resources} = await container.items
        .query({
          query: 'SELECT * FROM c',
        })
        .fetchAll();

      console.log(resources.length);
      counter = resources.length;

      await sleep(1000);
    } catch (e) {
      console.error(e);
      await sleep(30000);
    }
  }
}

main().then(() => console.log('done'));
