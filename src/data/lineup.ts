export type Slot = { start: string; end: string; artist: string; url?: string };
export type Stage = { name: string; slots: Slot[] };

export const stages: Stage[] = [
  {
    name: 'Main Stage',
    slots: [
      { start: '22:15', end: '23:45', artist: 'Mogwai' },
      { start: '20:15', end: '21:30', artist: 'Explosions In The Sky' },
      { start: '18:30', end: '19:30', artist: 'Thee Silver Mount Zion' },
      { start: '17:00', end: '18:00', artist: 'God Is An Astronaut' },
      { start: '15:15', end: '16:15', artist: '65 Days Of Static' },
      { start: '13:45', end: '14:45', artist: 'El Ten Eleven' },
      { start: '12:15', end: '13:15', artist: 'I Like Trains' },
    ],
  },
  {
    name: 'Other Stage',
    slots: [
      { start: '21:30', end: '23:00', artist: 'Sigur Rós' },
      { start: '19:00', end: '20:00', artist: 'This Will Destroy You' },
      { start: '17:15', end: '18:30', artist: 'Godspeed You! Black Emperor' },
      { start: '16:30', end: '17:00', artist: 'Tides From Nebula' },
      { start: '14:00', end: '14:45', artist: 'Maybeshewill' },
      { start: '12:30', end: '13:30', artist: 'Yndi Halda' },
      { start: '11:00', end: '12:00', artist: 'Errors' },
    ],
  },
];