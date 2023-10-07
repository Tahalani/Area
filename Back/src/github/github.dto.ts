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
