export type DataPullRequest = {
    owner: string,
    repo: string,
    title: string,
    body: string,
    head: string,
    base: string,
    maintainer_can_modify: boolean
}

export type DataIssue = {
    owner: string,
    repo: string,
    title: string,
    body: string,
    assignees: string[],
    milestone: number,
    labels: string[]
}

export type OnPush = {
    owner: string,
    repo: string,
}

export interface GitHubUser {
    login: string;
    id: number;
    node_id: string;
    avatar_url: string;
    gravatar_id: string;
    url: string;
    html_url: string;
    followers_url: string;
    following_url: string;
    gists_url: string;
    starred_url: string;
    subscriptions_url: string;
    organizations_url: string;
    repos_url: string;
    events_url: string;
    received_events_url: string;
    type: string;
    site_admin: boolean;
    name: string;
    company: null;
    blog: string;
    location: string;
    email: null;
    hireable: null;
    bio: null;
    twitter_username: null;
    public_repos: number;
    public_gists: number;
    followers: number;
    following: number;
    created_at: Date;
    updated_at: Date;
  }