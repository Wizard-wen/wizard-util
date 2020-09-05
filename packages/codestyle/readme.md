# code style

## 综述
代码风格采用airbnb规范
> eslint

> husky


> lint-staged

[lint-staged](https://www.npmjs.com/package/lint-staged)

# pre-commit 

## husky

> npm install -D lint-staged
> npm install -D husky

package.json
```js
    {
        "husky": {
            "hooks": {
            "pre-commit": "lint-staged"
            }
        },
        "lint-staged": {
            "*.{js,ts,tsx}": [
            "eslint --fix",
            ]
        }
    }
```
## eslint

> npm install -D eslint

配置eslint

> ./node_modules/.bin/eslint --init

