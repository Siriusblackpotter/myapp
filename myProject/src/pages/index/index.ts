import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {HttpClient} from '@angular/common/http'
import {DetailPage} from '../detail/detail'

/**
 * Generated class for the IndexPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-index',
  templateUrl: 'index.html',
})
export class IndexPage {
  carouselList = [] //保存轮播图数据
  newPList=[] //新品上市数据
  recommendedList=[] //推荐商品数据
  detailPage=DetailPage

  constructor(
    private myHttp:HttpClient,
    public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad IndexPage');
    var url = "http://localhost:8080/index"
    this.myHttp.get(url).subscribe((result:any)=>{
      //console.log(result)//result.carouselItems
      //保存了轮播图数据
      this.carouselList = result.carouselItems
      //保存新品上市数据
      this.newPList=result.newArrialItems
      //保存推荐商品数据
      this.recommendedList=result.recommendedItems
    })
  }

}
