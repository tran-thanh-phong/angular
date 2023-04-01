export interface Author {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  ipAddress: string;
}


export const authors : Author[] = [
  {
    id: 1,
    firstName: "P",
    lastName: "T",
    email: "p@t.c",
    gender: 'Male',
    ipAddress: '1.1.1.1'
  },
  {
    id: 2,
    firstName: "P2",
    lastName: "T2",
    email: "p2@t.c",
    gender: 'Female',
    ipAddress: '1.1.1.2'
  },
  {
    id: 3,
    firstName: "P3",
    lastName: "T3",
    email: "p3@t.c",
    gender: 'Male',
    ipAddress: '1.1.1.3'
  },
  {
    id: 4,
    firstName: "P4",
    lastName: "T4",
    email: "p4@t.c",
    gender: 'Female',
    ipAddress: '1.1.1.4'
  }
];
