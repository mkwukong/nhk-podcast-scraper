import * as api from "./api";
import { reqHeader } from "./api";
import { delay } from "./utils";

async function main() {
  const linksArr = await api.getDataLinks();

  for (let i = 0; i < linksArr.length; ++i) {
    const dataLink = linksArr[i]["normal"];
    const splittedLink = dataLink.split("/");
    const filePath = `../files/${splittedLink[splittedLink.length - 1]}`;
    api.download(dataLink, reqHeader, filePath);
    await delay(1000);
  }
}

main().catch((err) => console.log(err));
