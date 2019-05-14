import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ModalController } from 'ionic-angular';
import {HttpClient} from '@angular/common/http';
import {PayPage} from '../pay/pay';

/**
 * Generated class for the OrderConfirmPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-order-confirm',
  templateUrl: 'order-confirm.html',
})
export class OrderConfirmPage {

  cartList=[];
  constructor(public navCtrl: NavController, public navParams: NavParams,private myHttp:HttpClient,private myModal:ModalController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderConfirmPage');
    var url="http://localhost:8080/cart/list";
    this.myHttp.get(url,{withCredentials:true}).subscribe((result:any)=>{
      console.log(result)
      this.cartList=result.data;
    })
  }
  showModel(){
    var myModal=this.modalCtrl.create(PayPage);
    myModal.present();
  }

}
