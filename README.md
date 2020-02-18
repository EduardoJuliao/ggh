# GGH

Gx Git Helper is a CLI created to help with some common tasks.

## Available commands

### pull

When pulling from Repo, `ggh pull` will run the sequence of commands:

1. git pull
2. gulp

### clean

Create a clean environment.

1. Stop services
2. git clean -fdxq
3. Restore nuget
4. Restore npm
5. build solution
6. gulp
7. Create a new db:tiny
8. Start service

## merge-develop

Merge with develop.

1. Stop services
2. Clean bin/test-bin folders
3. change to develop
4. pull latest develop
5. go to previous branch
6. merge
7. restore nuget
8. restore npm
9. gulp
10. Start services

## Installing

To install this package locally there's two options:

```powershell
tsc; npm install -g
```

or

```powershell
npm run publish-local
```

## BTW

It's a complete mess and needs improvements