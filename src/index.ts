#!/usr/bin/env node
import { fromBuffer } from "file-type";
import minimist = require("minimist");
import { createReadStream } from "fs";
import { Stream } from "stream";

const argv = minimist(process.argv.slice(2));

const streamToBuffer = (stream: Stream): Promise<Buffer> => {
  return new Promise((resolve, reject) => {
    const _buf: Buffer[] = [];

    stream.on("data", (chunk) => _buf.push(chunk));
    stream.on("end", () => resolve(Buffer.concat(_buf)));
    stream.on("error", (err) => reject(err));
  });
};

const mimeTypeFromBuffer = async (buf: Buffer) => {
  const ss: any = await fromBuffer(buf);
  return ss ? ss.mime : ss;
};

const file2datauri = async (filename?: string, mimeType?: string) => {
  const stream = filename ? createReadStream(filename) : process.stdin;
  const buf = await streamToBuffer(stream);
  const mime = mimeType ? mimeType : await mimeTypeFromBuffer(buf);
  const data = buf.toString("base64");

  if (mime) {
    return `data:${mime};base64,${data}`;
  } else {
    return `data:;base64,${data}`;
  }
};

file2datauri(argv.f, argv.m)
  .then((a) => console.log(a))
  .catch((e) => console.log(e));
