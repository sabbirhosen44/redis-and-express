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
    // console.log(email, age, profession);

    // Lists -> LPUSH,RPUSH,LRANGE,LPOP,RPOP

    // await client.lPush("notes", ["note 1", "note 2", "note 3"]);
    // const extractNotes = await client.lRange("notes", 0, -1); // here lRange is used for extracting value from the lists. and 0, -1 means extract all the values from the list.
    // console.log(extractNotes);

    // const firstNote = await client.lPop("notes"); // lPop will remove and return the first element
    // console.log(firstNote);

    // const remainingNotes = await client.lRange("notes", 0, -1);
    // console.log(remainingNotes);

    // Sets -> SADD,SMEMBERS,SREM,SISMEMBER
    // await client.sAdd("user:nickname", ["john", "doe", "xyz"]);
    // const extractNicknames = await client.sMembers("user:nickname");
    // console.log(extractNicknames);
    // const isJohnIsOneOfUserNickname = await client.sIsMember(
    //   "user:nickname",
    //   "john"
    // );
    // console.log(isJohnIsOneOfUserNickname);

    // await client.sRem("user:nickname", "xyz");
    // const getUpdatedUserNickname = await client.sMembers("user:nickname");
    // console.log(getUpdatedUserNickname);

    // Sorted Sets (almost similar like sets but in sorted sets each element has a score associated with that element)
    // sorted sets -> ZADD,ZRANGE,ZRANK,ZREM
    await client.zAdd("cart", [
      { score: 100, value: "Cart 1" },
      { score: 150, value: "Cart 2" },
      { score: 10, value: "Cart 3" },
    ]);
    const getCartItems = await client.zRange("cart", 0, -1);
    console.log(getCartItems);
    const extractAllCartItemsWithScore = await client.zRangeWithScores(
      "cart",
      0,
      -1
    );
    console.log(extractAllCartItemsWithScore);

    const cartTwoRank = await client.zRank("cart", "Cart 2");
    console.log(cartTwoRank);
  } catch (error) {
    console.log(error);
  } finally {
    client.quit();
  }
};

redisDataStructures();
