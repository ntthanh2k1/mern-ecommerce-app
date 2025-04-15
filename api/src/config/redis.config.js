import Redis from "ioredis";

const client = new Redis("rediss://default:********@natural-mutt-21058.upstash.io:6379");
await client.set('foo', 'bar');