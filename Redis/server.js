import redis from "redis";

const client = redis.createClient({
  host: "localhost",
  port: 6379,
});

// event listeners
client.on("error", (error) =>
  console.log("Redis client error occured!", error)
);

const testRedisConnection = async () => {
  try {
    client.connect();
    console.log("Redis client connected successfully!");

    await client.set("name", "Sabbir");
    const extractName = await client.get("name");
    console.log("Extracted name from Redis:", extractName);

    const delCount = await client.del("name"); //delete keys and  returns number of keys deleted
    console.log(delCount);

    const extractNameAfterDel = await client.get("name");
    console.log(extractNameAfterDel); // should be null after deletion

    await client.set("count", "100");
    const incrementCount = await client.incr("count");
    console.log(incrementCount);

    const decrementCount = await client.decr("count");
    console.log(decrementCount);
  } catch (error) {
    console.log("Error connecting to Redis client:", error);
  } finally {
    client.quit(); // Ensure any open connections are closed
  }
};

testRedisConnection();
