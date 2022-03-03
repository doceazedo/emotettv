# emoteTTV
⚠ Heavy work in progress, do not use in production.

## Publishing to npm
1. Bump the package.json version
2. Run `yarn build`
3. Run `yarn publish`

## Publishing locally
1. Install and run [Verdaccio](https://verdaccio.org)
2. Bump the package.json version
3. Run `yarn build`
4. Run `yarn publish --registry http://localhost:4873`