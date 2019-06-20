# npm

# publish a package

1. add folder

```
  mkdir first-npm
  cd first-npm

```
2. init project

```
  npm init
```

package.json as:

```json
{
  "name": "first-npm",
  "version": "1.0.0",
  "description": "My First NPM project",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "repository": {
    "type": "git",
    "url": "http://github.com/edgardeng"
  },
  "keywords": [
    "NPM", "Package"
  ],
  "author": "edgardeng",
  "license": "ISC"
}
```

index.js as:

```
module.exports = 'This is my first NPM project';
```

3. Login

```
npm login
npm whoami

```

4. Publish

```
npm publish
```

