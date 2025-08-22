import redis from "redis";

const client = redis.createClient({
  host: "localhost",
  port: 6379,
});

// event listeners
client.on("error", (error) =>
  console.log("Redis client error occured!", error)
);

const redisDataStructures = async () => {
  try {
    await client.connect();

    // Strings -> SET,GET,MSET,MGET
    await client.set("user:name", "Sabbir Hosen");
    const name = await client.get("user:name");
    console.log(name);

    await client.mSet([
      "user:email",
      "sabbir@gmail.com",
      "user:age",
      "25",
      "user:profession",
      "student",
    ]);

    const [email, age, profession] = await client.mGet([
      "user:email",
      "user:age",
      "user:profession",
    ]);
    console.log(email, age, profession);

    // Lists -> LPUSH,RPUSH,LRANGE,LPOP,RPOP

    // await client.lPush("notes", ["note 1", "note 2", "note 3"]);
    const extractNotes = await client.lRange("notes", 0, -1); // here lRange is used for extracting value from the lists. and 0, -1 meanst extract all the values from the list.
    console.log(extractNotes);

    const firstNote = await client.lPop("notes"); // lPop will remove and return the first element
    console.log(firstNote);

    const remainingNotes = await client.lRange("notes", 0, -1);
    console.log(remainingNotes);
  } catch (error) {
    console.log(error);
  } finally {
    client.quit();
  }
};

redisDataStructures();
