import { readFileSync } from 'fs';
import * as path from 'path';
import { parseMidi } from 'midi-file';
import { Output, NOTE_TYPE, Event } from './interfaces';
import { parse } from 'path';


let input = readFileSync(path.resolve('D:\\Self_development\\MusicaLine\\data\\input.mid'));
let parsed = parseMidi(input);
let track: Event[] = (parsed.tracks[1] || {}).filter(ev => !ev.meta && ev.type != NOTE_TYPE.CONTROLLER && ev.type != NOTE_TYPE.PROGRAM_CHANGE);
let totalDuration: number = track.reduce((accu, curr) => accu + +curr.deltaTime || 0, 0);

let lines = [];
let currentTime: number = 0;

for (let ev of track) {
    let lineStartIndex = track.findIndex(t => t.type == NOTE_TYPE.NOTE_ON);
    let lineStart = lineStartIndex > -1 && track[lineStartIndex];
    
    track.splice(lineStartIndex, 1);
    
    let lineEndIndex = track.findIndex(t => t.type == NOTE_TYPE.NOTE_OFF);
    if(lineEndIndex == -1) {
        lineStart = null;
        break;
    }

    let lineEnd = track[lineEndIndex];
    track.splice(lineEndIndex, 1);
    lines.push({
        noteNumber: (lineStartIndex == -1 && lineEndIndex != -1 ) ? -1 : lineStart.noteNumber || lineEnd.noteNumber || 0,
        velocity: lineStart.velocity || lineEnd.velocity || 0,
        time: currentTime || 0,
        duration: ev.deltaTime
    });

    currentTime += ev.deltaTime;
}




console.log({
    lines
});




















let output: Output = {
    label: "moshe",
    creator: "dvir",
    description: "bulbul",
    duration: totalDuration,
    version: "6.2",
    startPosition: {
        x: 0,
        y: 0
    },
    lines: []
};
