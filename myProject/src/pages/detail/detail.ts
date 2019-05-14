import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController } from 'ionic-angular';
import {HttpClient} from '@angular/common/http';
import {NotFoundPage} from '../not-found/not-found';
import {CartPage} from '../cart/cart';
import {LoginPage} from '../login/login';
import {MyHttpService} from '../../service/myhttpservice'

/**
 * Generated class for the DetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html',
})
export class DetailPage {
  details = {} //存储服务器端所返回的详情数据

  constructor(
    private myHttp:HttpClient,
    private myService:MyHttpService,
    public navCtrl: NavController, 
    public navParams: NavParams,
    public ToastController:ToastController
    ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailPage');
    //接收参数，查看详情
    //console.log("detail收到的数据是："+this.navParams.get('id'))
    //this.navParams.get('id') 
    var url = "http://localhost:8080/product/detail?lid="+this.navParams.get("id");

    this.myHttp.get(url).subscribe((result:any)=>{
      console.log(result)
      //将result中的details对象保存起来，到视图中显示
      // 因为服务器端所返回的数据有时不包含details数据，在此做一个条件判断(理论来讲，服务器应该返回正确的数据)
      if(result.details){
        this.details = result.details;
      }
      
    })
  }
  jumpTo404(){
    this.navCtrl.push(NotFoundPage);
  }
  jumpTocart(){
    this.navCtrl.push(CartPage);
  }
  addTocart(){
    var url="http://localhost:8080/cart/add?buyCount=1&lid="+this.navParams.get('id');
    this.myHttp.get(url,{withCredentials:true}).subscribe((result:any)=>{
      console.log(result);
      if (result.code==300) {
        //未登录，跳转到登录页面
        this.navCtrl.push(LoginPage);
        console.log(result)
      }else if(result.code==200){
        //添加成功
        this.ToastController.create({
          message:"添加成功",
          duration:1500  
        }).present();
        console.log(result)
      }else{
        //添加失败
      }
    })
  }
}
