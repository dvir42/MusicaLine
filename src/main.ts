import {readFileSync, lchmod} from 'fs';
import * as path from 'path';
import {parseMidi} from 'midi-file';
import {Output} from './interfaces';
import { parse } from 'path';

let output: Output = {
    "label": "moshe",
    "creator": "dvir",
    "description": "bulbul",
    "duration": 40,
    "version": "6.2",
    "startPosition": {
      "x": 0,
      "y": 0
    },
    "lines": []
};

let input = readFileSync(path.resolve('D:\\Self_development\\MusicaLine\\data\\input.mid'));
let parsed = parseMidi(input);
let track = (parsed.tracks[1] || {}).filter( ev => !ev.meta);

console.log(track);

