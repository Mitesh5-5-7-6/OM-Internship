import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppComponent } from "./app.component";
import { HeaderComponent } from "./component/header/header.component";
import { InvestmentResultComponent } from "./component/investment-result/investment-result.component";
import { UserInputModule } from "./component/user-input/user-input.module";

@NgModule({
    declarations: [AppComponent, HeaderComponent, InvestmentResultComponent],
    imports: [BrowserModule, UserInputModule],
    bootstrap: [AppComponent]
})

export class AppModule { }