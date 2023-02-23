import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'msal-angular-tutorial';
  isIframe = false;
  loginDisplay = false;

  constructor(private authService: MsalService, private http : HttpClient, private formBuilder : FormBuilder) { }

  ngOnInit() {
    this.isIframe = window !== window.parent && !window.opener;
  }

  MS_JSON : object;

  token : string;
  userID : string;

  formChanged() {
    this.userID = (document.getElementsByName("userID")[0] as HTMLInputElement).value;
  }

  query_user() {
    console.log(this.userID);
    document.getElementById('demo').innerHTML = "Loading..."
    let headers = new HttpHeaders({
      'Authorization': "Bearer " + this.token,
      'Content-Type': 'application/json'});
    this.http.get("https://graph.microsoft.com/v1.0/auditLogs/signIns?&$filter=startsWith(userPrincipalName,'" + this.userID + "')", { headers: headers }).subscribe(data => {
      console.log(data);
      var i
      var x = ''
      this.MS_JSON = data;
      for (i in data['value']) {

        // IDEA: IP address is link to Spur at that IP address -> Need to figure out how to get popup in window
        //<mat-nav-list fxLayout="row">
        //<a mat-list-item href="#">One</a>
        //<a mat-list-item href="#">Two</a>
    //</mat-nav-list>


          x += "<p>" + i + "<span class=\"nums\">" + JSON.stringify(data['value'][i]) + "</span>" + "</p>"
      }
      document.getElementById('demo').innerHTML = x
    });
  }

  login() {
    this.authService.loginPopup()
      .subscribe({
        next: (result) => {
          console.log(result);
          this.setLoginDisplay();
          this.token = result.accessToken;
        },
        error: (error) => console.log(error)
      });
  }

  setLoginDisplay() {
    this.loginDisplay = this.authService.instance.getAllAccounts().length > 0;
  }
}