import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {LoadingController} from 'ionic-angular';

@Injectable()

export class MyHttpService{
    constructor(private myHttp:HttpClient,private loadingCtrl:LoadingController){}
    //封装一个方法，负责网络通信(loading,credentials)
    sendGetRequest(url,callback){
        //显示一个loading
        var myLoading=this.loadingCtrl.create({
            content:"正在加载数据"
        });
        myLoading.present();
        this.myHttp.get(url,{withCredentials:true}).subscribe((result)=>{
            //显示成功立刻关闭loading
            myLoading.dismiss();
            callback(result);
        })        
    }
}