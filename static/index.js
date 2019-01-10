
 

 var Index = {

    init:function(){
        //ie11 需要 设置contenteditable 为true
        $("#imgBox").height(400).attr("contenteditable",true).text(123);

        this.initEvent();
    },

    initEvent:function(){

        $("body").on("paste",function(event){

            var e = event.originalEvent;

            if(!e){
                return;
            }

            var items = e.clipboardData.items;
            for(var i = 0; i < items.length; ++i)
            {
                // 如果剪贴板中的内容类型是图片文件
                if (items[i].kind == 'file' && items[i].type.indexOf('image/') >= 0)
                {
                    e.preventDefault();

                    var blob = items[i].getAsFile();

                    if (blob.size === 0) {
                        return;
                    }

                    var reader = new FileReader();

                    reader.onload=function(data){

                        var img = document.createElement("img");
                        img.src = data.target.result; 
                        $("#imgBox").append(img); 
            
                    };
        
                    reader.readAsDataURL(blob); 

                };
            };
        });
    }


 }


 Index.init();