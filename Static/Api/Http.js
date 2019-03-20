import 'isomorphic-fetch'
import ApiURL from './url'


export default {

	//封装ajax
	fetch(data,callback) {

		if (!data) {
			return;
		}

		let url = this.getUrlByType(data),
			that = this;

		data.url = url;
		//删除对象上的数据
		delete data.outerData;
		delete data.URLType;

		data.success=function(data, text, res){  

			if (typeof (data) == "string") {
				// to json
				if (JSON && JSON.parse) {
					data = JSON.parse(data);
				} else {
					data = $.parseJSON(data);
				}
			}
			//未登录
			if (data.code == 10004) {
				window.location.href = data.data;
				return false;
			}

		 
			if (data.code != 0 && data.code != undefined) {
				console.log(data.message);
			}


			if ($.isFunction(callback)) {
				if (data.code == 0 || data.code == undefined) {
					//回调
					callback(data);
				} else {
					console.log(data.message);
					//App.common.modules.util.actionTip(data.message, true) 
				}
			}
		}

		data.error = function(data){  
			 
			//文件不存在跳到首页
			if(data.responseText=="文件不存在"){

				console.log(data.message);

				var timer = setTimeout(function(){
					clearTimeout(timer);
					location.href="/document/"+App.workspaceId;

				},1000); 
			}else{
				callback(false);
			} 

		}

		return $.ajax(data);

	},

	//post
	post(data, callback) {

		//数据转化
		data.headers = {
			"Content-Type": "application/json"
		}

		data.type = "POST";

		data.data = JSON.stringify(data.data);


		return this.fetch(data, callback);

	},

	//delete
	delete(data, callback) {

		data.type = "delete";
		//数据转化
		data.headers = {
			"Content-Type": "application/json"
		}
		data.data = JSON.stringify(data.data);
		return this.fetch(data, callback);

	},

	//put
	put(data, callback) {

		data.type = "put";
		//数据转化
		data.headers = {
			"Content-Type": "application/json"
		}
		data.data = JSON.stringify(data.data);
		return this.fetch(data, callback);

	},
	//上传接口 要分
	upload(data, callback) {

		if (!data) {
			return;
		}

		let url = this.getUrlByType(data),
			file = data.data.file,
			that = this;

		data.url = url;
		//删除对象上的数据
		delete data.outerData;
		delete data.URLType;

		var formdata = new FormData();
		formdata.append("fileName", file.name);
		formdata.append("size", file.size);
		formdata.append("file", file);

		return $.ajax({
			method: "post",
			url: url,
			processData: false,
			//必须false才会自动加上正确的Content-Type   
			contentType: false,
			data: formdata,
			xhr: function () {
				var xhr = $.ajaxSettings.xhr();
				//是否支持上传进度监听
				if (xhr.upload && typeof (xhr.upload.onprogress) == "object") {
					//是否需要监听进度
					if (data.progress) {
						xhr.upload.addEventListener("progress", data.progress, false);
					}
				}
				return xhr;
			}
		}).done(function (data) { 
			 
			if (data.code != undefined && data.code != 0) {
				console.log(data.message);
				return;
			}
			if (data.code != undefined && data.code != 0) {
				console.log(data.message);
				return;
			}

			typeof (callback) == "function" && callback(data);

		});


	},

	//构建url
	getUrlByType: function (data) {

		//存在不用构建
		if (data.url) {
			return data.url;
		}

		let url = ApiURL.Settings.hostname + ApiURL.URL[data.URLType];

		//是否调试 ApiURL.Settings.debug
		if (!url) {
			url = ApiURL.DEBUGURL[data.URLType];
		}

		//没有调试接口
		if (!url) {
			alert(data.URLtype + " 未定义");
		}

		//url 是否有参数
		var urlPars = url.match(/\{([\s\S]+?(\}?)+)\}/g),
			temp = data.data || {},
			outerData = data.outerData || {}; 

		//string
		if ((typeof temp) == 'string') {
			temp = JSON.parse(temp);
		}

		if(temp.length){
			data = {};
		}

		//赋值
		for (var key in outerData) {
			temp[key] = outerData[key];
		} 
		 
		if (urlPars) {
			for (var i = 0; i < urlPars.length; i++) {

				var rex = urlPars[i],
					par = rex.replace(/[{|}]/g, ""),
					val = temp[par];
				url = url.replace(rex, val);
			}
		}

		//请求 时间戳
		if (url.indexOf("?") > -1) {
			url += "&t=" + (+new Date);
		} else {
			url += '?t=' + (+new Date);
		}

		return url;
	}

}