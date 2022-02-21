export interface resData {
  data: {
    login: string;
    cursus_users: Array<{ [key: string]: string; blackholed_at: string }>;
  };
  accessToken: string;
}

export interface signUpData extends signData {
  userDeadline: string;
  userEmail: string;
  accessToken: string;
}

export interface signData {
  userClusterName: string;
  userPassword: string;
}

export interface signInFetch {
  userID: string;
  accessToken: string;
  userClusterName: string;
  userDeadline: string;
}

export interface DirectoryProps {
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  messageFiles: SimpleMessageData[];
  windowData: Number[];
  setWindowData: React.Dispatch<React.SetStateAction<Number[]>>;
}

export interface SimpleMessageData {
  messageID: Number;
  senderNickname: string;
}

export interface MessageData extends SimpleMessageData {
  messageTitle: string;
  messageText: string;
}

export interface SendMessageData {
  accessToken: string;
  userID: string;
  senderNickname: string;
  messageTitle: string;
  messageText: string;
}

export interface MessageProps {
  data: MessageData | null;
  clickedWindow?: string;
  setClickedWindow?: React.Dispatch<React.SetStateAction<string>> | undefined;
  deleteFromClickedMessages: (e: Number) => void;
}

export interface DraggableWindowProps {
  show?: boolean;
  zIndex?: string;
  setClickedWindow?: () => void;
  title: string;
  onHeaderButtonClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  children: JSX.Element;
  width: number;
  height: number;
}

export interface StyledWindowProps {
  show: boolean;
  width: number;
  height: number;
  zIndex: string;
  random: number[];
}
