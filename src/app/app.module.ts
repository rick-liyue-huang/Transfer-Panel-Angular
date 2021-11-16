import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { TransferPanelComponent } from './components/transfer-panel/transfer-panel.component';

@NgModule({
  declarations: [
    AppComponent,
    TransferPanelComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
