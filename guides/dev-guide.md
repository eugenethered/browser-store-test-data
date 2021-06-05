# Dev Guide - Browser Store Test Data
How to guide for developing Browser Store Test Data.

# Index
- [Containers](#containers) 
  - [LXC Container](#lxc-container)
- [Project Aliases](#project-aliases)

## Containers

### LXC Container
```shell
# Create NODE specific LXC container
./lxc-create-node-container.sh browser-store-test-data 10.104.71.8 /projects/code/browser-store-test-data
```

## Project Aliases
Add these aliases to `vi ~/bash/bash-profile-aliases/aliases/bash-projects`

```shell
# browser-store-test-data
alias browser-store-test-data.lxc.start="lxc.start-container browser-store-test-data"
alias browser-store-test-data.lxc.stop="lxc.stop-container browser-store-test-data"
alias browser-store-test-data.lxc.run-in="lxc.run-in.container browser-store-test-data"
alias browser-store-test-data.project="cd ~/projects/code/browser-store-test-data"
```
