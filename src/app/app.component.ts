import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core'; 

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'H24-420CW6-TP2-TahaBenyoussef';

  constructor(private translate: TranslateService) {
    
    this.translate.setDefaultLang('fr');
  }
  changeLanguage(lang: string): void {
    this.translate.use(lang);
  }
}
