#!/usr/bin/env sh

# abort on errors
set -e

# build
# npm run bp

# navigate into the build output directory
cd ./dist

# if you are deploying to a custom domain
echo 'onefx.js.org' > CNAME

git init
git add -A
git commit -m 'deploy'

# if you are deploying to https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master

# if you are deploying to https://<USERNAME>.github.io/<REPO>
 git push -f git@github.com:puncsky/onefx-home.git master:gh-pages

cd -
