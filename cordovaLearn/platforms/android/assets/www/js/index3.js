/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, fail);
        navigator.accelerometer.getCurrentAcceleration(app.onGetCurrentAccelerationOk,app.onGetCurrentAccelerationFailed );
        //app.startWatch();
        document.getElementById("stopWatchAccelerometer").onclick=app.stopWatch;
        document.getElementById("getContact").onclick=app.findContacts;
        document.getElementById("watchHeading").onclick=app.watchHeading;
        document.getElementById("notification_alert").onclick=app.showAert;
        document.getElementById("notification_playBeep").onclick=app.playBeep;
        document.getElementById("notification_vibrate").onclick=app.vibrate;
        document.getElementById("Capture_Photo_lib").onclick=app.uploadPhoto;
        //myKitty.name();
        navigator.toast.show("我是Toast,你好Kitty1",1);
        navigator.Echo.Echo(function(msg){
            alert(msg);
        },function(msg){
            alert(msg);
        },"hello this i a learn write plugin",1);
        //navigator.toast.openVideo("url");
        
        /*window.echo("echome",function(echoValue){
            alert(echoValue);
            alert(echoValue=="echome");
        })*/
        var directortyEntry=new DirectoryEntry("/tencent/MobileQQ/thumb","/tencent");
        console.log("######"+JSON.stringify(directortyEntry));

        

    },
    findContacts:function(){
        // find all contacts with 'Bob' in any name field
        var options = new ContactFindOptions();
        options.filter = "杰";
        var fields = ["displayName", "name"];
        navigator.contacts.find(fields, function onSuccess(contacts) {
                for (var i = 0; i < contacts.length; i++) {
                    console.log("contacts--------->"+JSON.stringify(contacts[i]));
                    console.log("Display Name = " + contacts[i].displayName);
                }
            }
        , function(){
            alert("get contacts failed");
        }, options);
    },
    onGetCurrentAccelerationOk:function(acceleration){
        /*alert('Acceleration X: ' + acceleration.x + '\n' +
              'Acceleration Y: ' + acceleration.y + '\n' +
              'Acceleration Z: ' + acceleration.z + '\n' +
              'Timestamp: '      + acceleration.timestamp + '\n');*/
        alert(JSON.stringify(acceleration));   
    },
    onGetCurrentAccelerationFailed:function(){
        alert("onGetCurrentAccelerationFailed");
    },
    startWatch:function(){
         var options = { frequency: 3000 };

        app.watchID = navigator.accelerometer.watchAcceleration(app.onwatchAccelerationcCange, app.onWatchFailed, options);
    },
    stopWatch:function () {
        if (app.watchID) {

            this.innerHTML="START WatchAcceleration";
            navigator.accelerometer.clearWatch(app.watchID);
            app.watchID = null;
        }else{
            this.innerHTML="STOP WatchAcceleration";
            app.startWatch();
        }
    },
    onwatchAccelerationcCange:function(acceleration){
         var element = document.getElementById('accelerometer');
        element.innerHTML = 'Acceleration X: ' + acceleration.x         + '<br />' +
                            'Acceleration Y: ' + acceleration.y         + '<br />' +
                            'Acceleration Z: ' + acceleration.z         + '<br />' +
                            'Timestamp: '      + acceleration.timestamp + '<br />';
    },
    onWatchFailed:function(){
        alert("watchAcceleration failed");
    },
    watchHeading:function(){
        //compass 指南针
        try{
            if(app.watchHeadID){
                document.getElementById("watchHeading").innerHTML="STRAT watchHeading";
                app.stopWtchHeading();
            }else{
                document.getElementById("watchHeading").innerHTML="STOP watchHeading";
                app.startWatchHeading();
            }
        }catch(e){

        }
    },
    startWatchHeading:function(){
        var options = { frequency: 3000 };
        app.watchHeadID = navigator.compass.watchHeading(app.onWatchHeadingSuccess, app.onWatchHeadingError, options);
    },
    stopWtchHeading:function(){
        navigator.compass.clearWatch(app.watchHeadID);
        app.watchHeadID = null;
    },
    onWatchHeadingSuccess:function(heading){
        console.log("heading--------->"+JSON.stringify(heading));
        var element = document.getElementById('heading');
        element.innerHTML = 'Heading: ' + heading.magneticHeading;
    },
    onWatchHeadingError:function(compassError){
        alert("Compass error"+compassError.code);
    },
    showAert:function(){
        navigator.notification.alert(
            'You are the winner!',  // message
            function(){
                alert("show alert callback")
            },
            'Game Over',            // title
            'Done'                  // buttonName
        );
    },
    playBeep:function(){
        
        navigator.notification.beep(30);
    },
    vibrate:function(){
        navigator.notification.vibrate(2000);
    },
    uploadPhoto:function(){
        navigator.camera.getPicture(
            app.uploadPhotoSuccess,
            function(message) { alert('get picture failed'); },
            {
                quality         : 50,
                destinationType : navigator.camera.DestinationType.NATIVE_URI,//navigator.camera.DestinationType.FILE_URI,
                sourceType      : navigator.camera.PictureSourceType.PHOTOLIBRARY
            }
        );
        /*Camera.DestinationType = {
            DATA_URL : 0,      // Return image as base64-encoded string
            FILE_URI : 1,      // Return image file URI
            NATIVE_URI : 2     // Return image native URI (e.g. assets-library:// on iOS or content:// on Android)
        };*/   
    },
    uploadPhotoSuccess:function(imageURI){
        console.log("imageURI------->"+JSON.stringify(imageURI));
        var options = new FileUploadOptions();
            options.fileKey="file";
            options.fileName=imageURI.substr(imageURI.lastIndexOf('/')+1);
            options.mimeType="image/jpeg";

            var params = {};
            params.value1 = "test";
            params.value2 = "param";

            options.params = params;

            var ft = new FileTransfer();
            ft.upload(imageURI, encodeURI("http://www.feilingmusic.com/p"), function(){}, function(){}, options);
    },
    segmantData:1000
};

    function gotFS(fileSystem) {
        console.log('fileSystem------------>'+JSON.stringify(fileSystem));
        console.log(fileSystem.name);
        console.log('fileSystem root----->'+JSON.stringify(fileSystem.root));
        
        getEntry(fileSystem.root);
        //fileSystem.root.getFile("readme.txt", null, gotFileEntry, fail);
        //fileSystem.root.getFile("readme.txt", {create:true,exclusive:false}, gotFileEntry, fail);
        fileSystem.root.getDirectory("cordovaTest",{create:true,exclusive:false},gotDirectory,fail);
        /*
        //获取tencent/Mobile/thumb 图片信息
        fileSystem.root.getDirectory("tencent/MobileQQ/thumb",null,function(directortyEntry){
            //console.log("directortyEntry-------!!!!!"+JSON.stringify(directortyEntry));
            var directoryReader=directortyEntry.createReader();
            directoryReader.readEntries(function(entries){
                for(var i=0;i<entries.length;i++){
                    console.log(JSON.stringify(entries[i]));
                }
            })
        },function(error){
            console.log("erro------------>>"+JSON.stringify(error));
        })*/
        
        
    }
    function gotDirectory(directortyEntry){
        console.log("directortyEntry----->"+JSON.stringify(directortyEntry));
        console.log("directortyEntry toURL----->"+directortyEntry.toURL());
        var timeStamp=+new Date();
        directortyEntry.getFile(timeStamp.toString()+".txt",{create:true,exclusive:false},gotFileEntry,fail);
        window.localStorage.setItem("xss",timeStamp);
    }

    function getEntry(entry){
        var backEntries=document.getElementById("backEntries");
        backEntries.entry=entry;
        console.log("--------entry"+JSON.stringify(entry));
        
        backEntries.onclick=function(){
            this.entry.getParent(function(parent){
                console.log("parent==========>"+JSON.stringify(parent));
                getEntry(parent);    
                
            },function(error){
                alert("failed to get Parent directorty"+error.code);
            })
        }

        var directoryReader=entry.createReader();
        directoryReader.readEntries(function(entries){
            //console.log("entries-----=====>>"+JSON.stringify(entries));
            renderDirectories(entries);
            
        },function(error){
            alert("Faile to list directorty contents: "+error.code);
        })
    }

    function renderDirectories(entries){

        var directoryList=document.getElementById("list");
        directoryList.innerHTML="";
        fileterHideAndSort(entries);

        
        for(var i=0;i<entries.length;i++){  
            var curEntry=createEle("li");
            directoryList.appendChild(curEntry);
            if(entries[i].isFile){
                curEntry.innerHTML=entries[i].name+"-->F";
                curEntry.entry=entries[i];
                curEntry.onclick=function(){
                    //console.log(JSON.stringify(this.entry));
                    this.entry.file(function(file){
                        gotFile(file);
                    },function(){

                    })
                }
            }else{
                curEntry.innerHTML=entries[i].name+"-->D";
                curEntry.entry=entries[i];
                curEntry.onclick=function(){
                    getEntry(this.entry);
                }
            }
        }
        
        /*
        //need to test this api
        for(var i=0;i<entries.length;i++){
            ;(function(j){
                if(entries[j].isFile){
                    entries[j].file(function(file){
                        var d = new Date(file.lastMoifiedDate);
                        var time_diff= DateDiffSeconds(new Date(),d);
                        if(time_diff>3600){
                            entries[j].remove(function(){
                                alert("removeSucess")
                            },function(){

                            })
                        }
                    })
                }
            })(i);
        }
        */
    }
    function deleteFileFromFolder(entries,time_diff){
        for(var i=0;i<entries.length;i++){
            ;(function(j){
                if(entries[j].isFile){
                    entries[j].file(function(file){
                        var d = new Date(file.lastMoifiedDate);
                        var time_diff= DateDiffSeconds(new Date(),d);
                        if(time_diff>time_diff){
                            entries[j].remove(function(){
                                alert("removeSucess")
                            },function(){

                            })
                        }
                    })
                }
            })(i);
        }
    }
    function DateDiffSeconds(curDate,d){
        return curDate.getSeconds-d.getSeconds
    }
    function fileterHideAndSort(entries){
        //过滤不可见文件
        for(var i=0;i<entries.length;){
            if(entries[i].name.charAt(0)=="."){
                entries.splice(i,1);
            }else{
                i++;
            }
        }
        //对对象进行排序
        entries.sort(sortRule);
    }

    function gotFile(file){
        console.log("file------------->"+JSON.stringify(file));
            
        /*
        //fileTransfer 上传文件
        var fileURI=file.localURL;
        var options = new FileUploadOptions();
        options.fileKey = "file";
        options.filename=file.name;
        options.mimeType="text/plain";

        var params={};
        params.value1="test";
        params.value2="param";

        options.params=params;
        var ft = new FileTransfer();
        ft.upload(fileURI,encodeURI("http://www.feilingmusic.com/p"),uploadSuccess,uploadFailed,options)
        */

        //读取文件内容
        //readDataUrl(file);
        //readAsText
        app.start=0;
        app.fileSize=file.size;
        var segmantData=null;
        app.fileManager=new Event();

        app.fileManager.on("sendData",readSliceFile);
        app.fileManager.emit("sendData",readSliceFile);

        function readSliceFile(){
            segmantData=file.slice(app.segmantData*app.start,app.segmantData*(app.start+1));
            readAsText(segmantData);
            app.start++;
        }

        
    }
    function uploadSuccess(r){
        alert(JSON.stringify(r))
        console.log("Code = " + r.responseCode);
        console.log("Response = " + r.response);
        console.log("Sent = " + r.bytesSent);
    }
    function uploadFailed(error){
        alert("An error has occurred: Code = " + error.code);
        console.log("upload error source " + error.source);
        console.log("upload error target " + error.target);
    }
    function readDataUrl(file){
        var reader=new FileReader();
        reader.onloadend=function(evt){
            console.log("readAsDataUrl-------->");
            alert(evt.target.result);

        }
        reader.readAsDataURL(file);


    }
    function readAsText(file){
        var reader=new FileReader();
        reader.onloadend=function(evt){
            console.log(evt.target.result.length);
            //send data
            if(evt.target.result.length==app.segmantData){
                console.log(app.start);
                app.fileManager.emit("sendData");  //type sendData ----》callback
                var per=Math.floor(app.start*app.segmantData/app.fileSize*10000/100);
                document.getElementById("progress").style.width=per+"%";
                document.getElementById("progressSpan").innerHTML=per+"%";

                //发送数据   自定义消息通知
            }else{
                //最后一次发送数据

                document.getElementById("progress").style.width="100%";
                document.getElementById("progressSpan").innerHTML="100%"
                alert("sendFile successlly!!! it's so wonderfull");
                app.start=0;
            }

        }   
        reader.readAsText(file);
    }
    function sortRule(a,b){
        var len=Math.min(a.name.length,b.name.length);
        var changA=a.name;
        var changeB=b.name;

        for(var i=0;i<len;i++){
            if(changA.charCodeAt(i)-changeB.charCodeAt(i)>0){
                return 1
            }else if(changA.charCodeAt(i)-changeB.charCodeAt(i)<0){
                return -1;
            }
            continue;
        }
        return 0;
    }
    function createEle(tagName){
        return document.createElement(tagName);
    }
    function gotFileEntry(fileEntry){
        fileEntry.createWriter(gotFileWriter,fail);
        console.log("--------->fileEntry"+JSON.stringify(fileEntry));
        
        //look up metadata about a file
        fileEntry.getMetadata(function(metadata){
            console.log(JSON.stringify(metadata));
            console.log("Last Modified: "+metadata.modificationTime);
        },function(error){
            alert(error.code);
        });

        //setMetadata  
        //Set metadata on a file
        //Currently works only on IOS . this will set the extended attributes of a file
        /*function success() {
            console.log("The metadata was successfully set.");
        }

        function fail() {
            alert("There was an error in setting the metadata");
        }
        // Set the metadata
        entry.setMetadata(success, fail, { "com.apple.MobileBackup": 1});
        */

        /*
        returns a URL that can be used to locate the file
        var fileURl=fileEntry.toURL();
        console.log(fileURl);
        
        //deletes a file
        fileEntry.remove(function(status){
            console.log("----->remove display fileEntry"+JSON.stringify(status))
        },function(error){
            alert("Error removing file: "+error.code);
        })
        */

        /*
        //getParent 
        //look up the parent DirectoryEntry (containing the fie).;
        fileEntry.getParent(function(parent){
            console.log('parent'+JSON.stringify(parent));
            console.log('Parent Name:---->'+parent.name);//root  根目录
        },function(error){
            alert(error.code);
        })
        */

        /*
        //obtain properties of a file
        fileEntry.file(function(file){
            console.log('file----!!!'+JSON.stringify(file));
        },function(error){
            console.log(JSON.stringify(error));
            alert('Unable to retrieve file properties: '+error.code);
        })
        */

    }
    function gotFileWriter(writer){
        console.log(writer.readyState);
        writer.onwriteend=function(evt){
            /*console.log("contents of file now 'some sample text'");
            writer.truncate(11);
            writer.onwriteend=function(evt){
                console.log("contents of file now 'some sample");
                //writer.seek(4);//追加添写文字
                writer.write(' different text');
                writer.onwriteend=function(evt){
                    console.log("contents of file now 'some different text'")
                }
            }*/
        }
        writer.onwrite=function(){
            // called when the request has completed successfully. function;

        }
        writer.onwriteend=function(){
            //called when the request has completed (either in success or failure). function
            str=null;
            window.localStorage.setItem("pointer",writer.position);
            alert(writer.position);//48 8891
        }
        writer.onprogress=function(){
            //the property is not supported .called while writing the file,reporting progress in terms of progress.loaded/progress.total.(function)
        }
        writer.onwritestart=function(){

        }
        writer.onabort=function(){

        }
        var str="";
        for(var i=0;i<1000000;i++){
            str+=i;
        }
        writer.write(str);
        //methods (abort seek truncate write);
        
    }
    
    function fail(evt) {
    	alert("failed");
        console.log(evt.target.error.code);
    }
    /*window.echo=function(str,callback){
        cordova.exec(callback,function(err){
            callback('Nothing to echo.');
        },"Echo","echo",[str]);
    }*/

app.initialize();