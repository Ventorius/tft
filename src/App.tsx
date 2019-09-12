import React, { useState } from "react";
import combinatorics from "js-combinatorics";

// import champions from "./data/champions.json";
import items from "./data/items.json";

const keys: string[] = Object.keys(items);

interface ItemList {
  [key: string]: any;
}

const list: ItemList = items;

const App: React.FC = () => {
  const [items, setItems] = useState([
    "bfsword",
    "bfsword",
    "giantsbelt",
    "recurvebow"
  ]);

  const getBuildableItems = (basicItems: string[]) => {
    const variants = combinatorics.combination(basicItems, 2).toArray();

    const firstVariant = variants[0];

    const firstItem = firstVariant[0];
    const secondItem = firstVariant[1];

    const buildable = variants.map(variant => {
      const firstItem = variant[0];
      const secondItem = variant[1];

      const firstBuildsTo: string[] = list[firstItem].buildsInto;
      const secondBuildsTo: string[] = list[secondItem].buildsInto;

      return firstBuildsTo.filter(item => {
        return secondBuildsTo.find(
          secondItem => item === secondItem && item !== undefined
        );
      });
    });

    return buildable.reduce(
      (res, curr) => {
        return [...res, curr[0]];
      },
      [] as string[]
    );
  };

  const basicItems = keys.filter(key => !list[key].buildsFrom).map(key => key);

  const advancedItems = keys
    .filter(key => list[key].buildsFrom)
    .map(key => key);

  return (
    <div className="main">
      <div className="column">
        <h2>Basic items</h2>
        {basicItems.map(item => (
          <div>{item}</div>
        ))}
      </div>

      <div className="column">
        <h2>Advanced items</h2>
        {advancedItems.map(item => (
          <div>{item}</div>
        ))}
      </div>

      <div className="column">
        <h2>Currently owned items</h2>
        {items.map(item => (
          <div>{item}</div>
        ))}
      </div>

      <div className="column">
        <h2>Buildable items - all permutations</h2>
        {getBuildableItems(items).map(item => (
          <div>{item}</div>
        ))}

        <h2>Buildable items - without duplicates</h2>
        {[...new Set(getBuildableItems(items))].map(item => (
          <div>{item}</div>
        ))}
      </div>
    </div>
  );
};

export default App;
