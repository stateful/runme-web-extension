export function getLinkDetails () {
    let fileToOpen = 'README.md'
    const [orgId, projectName, tree, sha, ...pathToFile] = document.location.pathname.slice(1).split('/')

    if (pathToFile.length) {
        fileToOpen = pathToFile.join('/') + ((pathToFile.slice(-1)[0] || '').endsWith('.md') ? '' : '/README.md')
    }

    return {
        repository: `https://github.com/${orgId}/${projectName}.git`,
        fileToOpen
    }
}
