import axios from "axios";
import { promisify } from "util";
import * as fs from "fs";

//champions levels => + 80% stats => + 100% stats

const writeFile = promisify(fs.writeFile);

const CHAMPIONS_URL =
  "https://solomid-resources.s3.amazonaws.com/blitz/tft/data/champions.json";
const ITEMS_URL =
  "https://solomid-resources.s3.amazonaws.com/blitz/tft/data/items.json";
const CLASSES_URL =
  "https://solomid-resources.s3.amazonaws.com/blitz/tft/data/classes.json";
const ORIGINS_URL =
  "https://solomid-resources.s3.amazonaws.com/blitz/tft/data/origins.json";
const TIERS_URL =
  "https://solomid-resources.s3.amazonaws.com/blitz/tft/data/tierlist.json";

(async () => {
  const getStaticData = async () => {
    const champions = await axios.get(CHAMPIONS_URL);
    const items = await axios.get(ITEMS_URL);
    const classes = await axios.get(CLASSES_URL);
    const origins = await axios.get(ORIGINS_URL);
    const tiers = await axios.get(TIERS_URL);

    await writeFile("./data/champions.json", JSON.stringify(champions.data));
    await writeFile("./data/items.json", JSON.stringify(items.data));
    await writeFile("./data/classes.json", JSON.stringify(classes.data));
    await writeFile("./data/origins.json", JSON.stringify(origins.data));
    await writeFile("./data/tiers.json", JSON.stringify(tiers.data));
  };

  await getStaticData();
})();
