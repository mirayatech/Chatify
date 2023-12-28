export type ProfileType = {
  uid: string;
  username: string;
  email: string;
  chatMode: string;
  profilePicture: string;
};
export type StyledProps = {
  theme: string | null;
};

export type ConversationInfoType = {
  users: string[];
  group?: {
    admins: string[];
    groupName: null | string;
    groupImage: null | string;
  };

  seen: {
    [key: string]: string;
  };
  updatedAt: {
    seconds: number;
    nanoseconds: number;
  };
  theme: string;
};

export interface SavedUserType {
  uid: string;
  email: string | null;
  displayName: string;
  photoURL: string;
  phoneNumber: string | null;
}

export interface MessageItemType {
  id?: string;
  sender: string;
  content: string;
  replyTo?: string;
  file?: {
    name: string;
    size: number;
  };
  createdAt: {
    seconds: number;
    nanoseconds: number;
  };
  type: "text" | "image" | "file" | "sticker" | "removed";
  reactions: {
    [key: string]: number;
  };
}

export type ReplyInfoType = {
  id: string;
  sender: string;
  type: "text" | "image" | "file" | "removed";
  content: string;
};
