import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {HttpClient} from '@angular/common/http'
import {LoginPage} from '../login/login'

/**
 * Generated class for the CartPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage {
  cartList = [];
  isAllSelected = false;//要和全选复选框做双向数据绑定
  

  constructor(
    private myHttp:HttpClient,
    public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter CartPage');
    var url = "http://localhost:8080/cart/list";
    
    this.myHttp.get(url,{withCredentials:true}).subscribe((result:any)=>{
      // console.log(result)
      if(result.code==300){
        this.navCtrl.push(LoginPage)
      }else if(result.code == 200){
        console.log(result)//result.data所对应的对象数组 渲染在视图
        this.cartList = result.data
        // 遍历购物车列表，给每一个商品指定一个属性isSelected:来记录当前的商品有没有被选中
        for(var i=0;i<this.cartList.length;i++){
          this.cartList[i].isSelected = false
        }
      }
    })
  }

  // 处理全选操作的方法
  handleAll(){
    for(var i=0;i<this.cartList.length;i++){
      this.cartList[i].isSelected = this.isAllSelected
    }
  }

  //购物车列表某一个商品的复选框操作要执行的方法
  handleSelectOne(){
    //执行一个逻辑与运算，将结果赋值给isAllSelected
    var result = true;
    for(var i=0;i<this.cartList.length;i++){
      result = 
        result && this.cartList[i].isSelected
    }
    this.isAllSelected = result

  }

  //指定一个方法 计算合计消费的金额
  calcTotalPrice(){
    var result = 0
    for(var i=0;i<this.cartList.length;i++){
      var p = this.cartList[i];
      if(p.isSelected){
        result += (p.price*p.count)
      }
    }
    return result
  }

  // 购物车商品的数量减
  minCount(index){
    if(this.cartList[index].count == 1){
      return
    }
    this.cartList[index].count--;
  }
  // 购物车商品的数量加
  addCount(index){
    this.cartList[index].count++;
  }

}
