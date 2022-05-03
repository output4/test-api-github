
export interface IRepo {
    node: {
        id: string;
        name: string;
        url: string;
    }
}
export interface IProps {
    user: string;
    onBack: Function;
}
export interface IUser {
    avatarUrl: string;
    bio: string;
    company: string;
    id: string;
    location: string;
    name: string;
    repositories: {
        edges: IRepo[];
    };
    login: string;
    url: string;
    followers: ITotal;
    following: ITotal;
    starredRepositories: ITotal;
}
export interface IState {
    user: IUser | null;
    error: boolean;
}
export interface IPropsAvatar {
    url: string;
}

export interface ITotal {
    totalCount: number;
}
