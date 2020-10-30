import {Component, OnInit} from '@angular/core';
import {ConfigurationService} from "@boards/configuration";

@Component({
  selector: 'boards-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  theme: string = 'queo';

  constructor(private configurationService: ConfigurationService){}

  ngOnInit(): void {
    let config = this.configurationService.config;
    if (!!config && config.getValue().theme) {
      this.theme = config.getValue().theme;
    }
    document.getElementById('body').classList.add('-'+this.theme);
    document.getElementById('appFavicon').setAttribute('href', `/assets/favicons/${this.theme}-logo.ico`);
  }

}
