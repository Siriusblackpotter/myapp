import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController } from 'ionic-angular';
import {HttpClient} from '@angular/common/http';
import {IndexPage} from '../index/index';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  myName="";
  myPwd="";
  constructor(
    private myHttp:HttpClient,
    public navCtrl: NavController, 
    public navParams: NavParams,
    public ToastController:ToastController
    ) {
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad LoginPage');
  }
  login(){
    //获取用户名和密码
    //请求服务器端验证用户是否有效
    //根据服务器端的结果做处理
    var url="http://localhost:8080/user/login";
    this.myHttp.post(url,{uname:this.myName,upwd:this.myPwd},{withCredentials:true}).subscribe((result:any)=>{
      if (result.code==200) {
        this.navCtrl.pop();
      }else{
        this.ToastController.create({
          message:"登陆失败",
          duration:1500
        }).present();
      }
    })
  }

}
