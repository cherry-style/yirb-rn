export interface Message {
  id: string;
  nickname: string;
  text: string;
  timestamp: any;
  pending?: true;
}
