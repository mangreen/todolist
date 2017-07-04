# Todo List & Image Uploader


# 如何架設環境

1. 安裝 Node.js

2. npm install 相關套件

		$ npm install

3. 安裝 bower

		$ npm -g install bower

4. bower install 相關套件

		$ bower install

5. 複製 config/local-template.js -> config/local.js

6. 修改 config/local.js 中的參數(或保留預設)


# 如何啓動？

	$ npm start

或

	$ node develop.js

或是利用 gulp

	$ npm install -g gulp # 安裝 gulp
	$ npm install gulp # 安裝 local gulp
	$ gulp

# Image API

```	
1. POST /api/images/upload
```

| body | required | Type |
| ------| ------ | ------ |
| image | required | base64 |
	
```	
2. GET /images/:id/(:size)
```

| params | required | Type | Detail |
| ------| ------ | ------| ------ |
| id | required | string |	|
| size | optional | string | s:width=50px m:width=100px l:width=500px |

###### ex. http://localhost:3000/ABCDEFGH/s