import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-i18n',
  templateUrl: './i18n.component.html',
  styleUrls: ['./i18n.component.css']
})
export class I18nComponent implements OnInit {

  Langue: string = "fr";

  constructor(public translater :TranslateService) {

    translater.setDefaultLang(this.Langue);
  }
  ngOnInit() {
  }

  changeLangue(langue : string):void{

    this.Langue = langue;
    this.translater.use(this.Langue);

}
}
