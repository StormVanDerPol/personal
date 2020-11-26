import { useContext, createContext } from "react";

export const keyStoreContext = createContext<string[]>([]);

const useUniqueKey = () => {
  const keyStore = useContext<string[]>(keyStoreContext);

  const keyGen = (prefix: string, failsafe?: boolean) =>
    `${prefix}-${keyStore.length}-${Date.now()}${
      failsafe ? `-${Math.round(Math.random() * 10000)}` : ""
    }`;

  const getKey = (prefix: string) => {
    let key = keyGen(prefix);
    while (keyStore.includes(key)) {
      console.warn("Dupe key! how the fuck tho. Regenerating...");
      key = keyGen(prefix, true);
    }

    keyStore.push(key);
    return key;
  };

  return getKey;
};

export default useUniqueKey;
