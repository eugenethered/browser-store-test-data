# Dev Guide - Browser Store Test Data
How to guide for developing Browser Store Test Data.

## Index
- [Developing](#developing)
  - [Installing Dependencies](#installing-dependencies)
- [Containers](#containers) 
  - [LXC Container](#lxc-container)
- [Project Aliases](#project-aliases)
- [Publishing](#publishing)
  - [Automated CI](#automated-ci)
- [Resources](#resources)

### Developing

#### Installing Dependencies
1. `npm install` (install all dependencies)
2. `npm install [DEPENDENCY] --save-dev` (to install a specific dependency)

### Containers
Containers allow one to develop and test in isolated 'spaces'.
There are many options available VM images, dedicated machines/computers/servers, Docker, etc.
Here this project has employed "Linux Containers", see resources.

#### LXC Container
This employs a helper script to create a small Alpine Linux container with prerequisite software Node.js, etc.

See ['bash-scripts' Github Project](https://github.com/eugene-the-red/bash-scripts) and look in the lxc dir.

```shell
# Create NODE specific LXC container
./lxc-create-node-container.sh browser-store-test-data 10.104.71.8 /projects/code/node-module/browser-store-test-data
```

### Project Aliases
Project aliases, simply allow you to jump to specific project easily.

See ['bash-profile-aliases' Github project](https://github.com/eugene-the-red/bash-profile-aliases) project.

Add these aliases to `vi ~/bash/bash-profile-aliases/aliases/bash-projects`

```shell
# browser-store-test-data
alias browser-store-test-data.lxc.start="lxc.start-container browser-store-test-data"
alias browser-store-test-data.lxc.stop="lxc.stop-container browser-store-test-data"
alias browser-store-test-data.lxc.run-in="lxc.run-in.container browser-store-test-data"
alias browser-store-test-data.project="cd ~/projects/code/node-module/browser-store-test-data"
```

### Publishing
1. `npm adduser` (only needed on first occasion)
2. `npm login`
3. `npm publish --access=public`

#### Automated CI 
This project employs Github Actions.

1. A NPM Access Token is required - store this as repository secret `NPM_DEPLOY_TOKEN`
2. Github secrets token - store this as personal access token `GITHUB_TOKEN`


### Resources
* [Linux Containers (LXD/LXC)](https://linuxcontainers.org/lxd/introduction/)
