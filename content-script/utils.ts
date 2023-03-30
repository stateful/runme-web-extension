export interface LinkDetails {
  fileToOpen: string
  repository: string
}

export function getLinkDetails (pathname = document.location.pathname): LinkDetails {
    let fileToOpen = 'README.md'
    const [orgId, projectName, tree, sha, ...pathToFile] = pathname.slice(1).split('/')

    if (pathToFile.length) {
        fileToOpen = pathToFile.join('/') + ((pathToFile.slice(-1)[0] || '').endsWith('.md') ? '' : '/README.md')
    }

    return {
        repository: `https://github.com/${orgId}/${projectName}.git`,
        fileToOpen
    }
}

export function getVSCodeHref (repository: string, fileToOpen: string) {
  return `https://runme.dev/api/runme?repository=${encodeURIComponent(repository)}&fileToOpen=${fileToOpen}`
}
