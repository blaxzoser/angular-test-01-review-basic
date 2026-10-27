
export enum Priority {
  Low = 'low',
  Medium = 'medium',
  High = 'high',
}


export interface Task {
  id: number;
  title: string;
  priority: Priority;
  done:boolean
}
