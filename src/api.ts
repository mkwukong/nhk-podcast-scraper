import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { PodcastLinks } from "../models/link-object";
import * as fs from "fs";

const url = "https://api.nhk.or.jp/r-news/v1/newslist.js?callback=radionews";

const USER_AGENT =
  "User-Agent: Mozilla/5.0 (X11; Linux x86_64; rv:78.0) Gecko/20100101 Firefox/78.0";

const header = {
  referrer: "https://www.nhk.or.jp/radionews/",
  accept: "*/*",
  "user-agent": USER_AGENT,
  "accept-language": "en-GB,en;q=0.5",
};

export async function getDataLinks(): Promise<PodcastLinks[]> {
  const resp = await axios.get(url, {
    headers: header,
  });

  const data = JSON.parse(resp.data.split("radionews(")[1].split(");")[0]);
  const fileNames = ["normal", "fast", "slow"];
  const apiUrl = "https://www.nhk.or.jp/r-news/ondemand/mp3/";
  const links: PodcastLinks[] = [];
  for (const news of data.news) {
    const obj: PodcastLinks = {};
    for (let i = 0; i < 3; ++i) {
      obj[fileNames[i]] =
        `${apiUrl}${news.soundlist[`sound_${fileNames[i]}`].filename}` + `.mp3`;
    }
    links.push(obj);
  }

  return links;
}

// Download and save mp3 files

export const reqHeader: AxiosRequestConfig = {
  method: "GET",
  responseType: "stream",
};

export async function download(
  url: string,
  reqHeader: AxiosRequestConfig,
  filePath: string
) {
  reqHeader["url"] = url;
  await axios
    .request(reqHeader)
    .then((res: AxiosResponse) => {
      res.data.pipe(fs.createWriteStream(filePath));
    })
    .catch((err) => {
      console.log(err);
    });
}
