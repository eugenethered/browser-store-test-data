# Dev Guide - Browser Store Test Data
How to guide for developing Browser Store Test Data.

## Index
- [Developing](#developing)
  - [Installing Dependencies](#installing-dependencies)
- [Containers](#containers) 
  - [LXC Container](#lxc-container)
- [Project Aliases](#project-aliases)
- [Deploying](#deploying)
  - [Deploy from container](#deploy-from-container)
  - [Automated CI](#automated-ci)
    - [Workflow prerequisites](#workflow-prerequisites)
    - [Workflow commit messages](#workflow-commit-messages)
    - [Updating the main branch code after during release](#updating-the-main-branch-code-after-during-release)
- [Installing this plugin from dir](#installing-this-plugin-from-dir)
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

### Deploying

#### Deploy from container
Deploying from the container, is rather easy. 
Login and deploy using these steps.

1. `npm adduser` (only needed on first occasion)
2. `npm login`
3. `npm publish --access=public`

#### Automated CI 
This project employs Github Actions. 
Invariably due to deployment employing `semantic-release`, one has to use specific commit message style/format.

##### Workflow prerequisites
* A NPM Access Token is required - store this as repository secret `NPM_DEPLOY_TOKEN`
* Github secrets token - store this as personal access token `GITHUB_TOKEN`

##### Workflow commit messages
`semantic-release` uses [angular style commit messages](https://github.com/angular/angular/blob/master/CONTRIBUTING.md#commit) by default.
Therefore if you want to trigger a release, you need to commit as follows:
* `feat: initial release`

##### Updating the main branch code after during release
By default `semantic-release` does not provide git update on master by default, 
so you need to install `@semantic-release/git` and add this to the `.releaserc` config.

### Installing this plugin from dir
One does not want to keep publishing the module in order to make changes.
So it's best to install this via npm "folder" option. Here I'm using a LXC container (sp paths may vary for you).

1. If using a container, mount the top level dir as follows (stop container first):
```shell
lxc config device add [CONTAINER_NAME] node-module-source-dir disk source=$HOME/projects/code/node-module path=/home/contain/projects/code/node-module
```
2. `npm i /home/contain/projects/code/node-module/browser-store-test-data`
3. Update this project with `npm run compile` or `nc`

### Resources
* [Linux Containers (LXD/LXC)](https://linuxcontainers.org/lxd/introduction/)
