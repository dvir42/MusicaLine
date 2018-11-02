
export interface Line {
    id: number,
    x1: number,
    x2: number,
    y1: number,
    y2: number,
    type: LineType,
}

export enum LineType {
    NORMAL,
    ACCELERATE,
    COMMENT
}

export interface Output {
    "label": string,
    "creator": string,
    "description": string,
    "duration": number,
    "version": "6.2",
    "startPosition": {
        "x": 0,
        "y": 0
    },
    "lines": Line[]
}

export enum NOTE_TYPE {
    NOTE_ON = 'noteOn',
    NOTE_OFF = 'noteOff',
    PROGRAM_CHANGE = 'programChange',
    CONTROLLER = 'controller'
}

export interface Event {
    deltaTime: number;
    channel: number;
    type: NOTE_TYPE;
    noteNumber: number;
    velocity: number;
}