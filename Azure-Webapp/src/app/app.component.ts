import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MsalService } from '@azure/msal-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'msal-angular-tutorial';
  isIframe = false;
  loginDisplay = false;

  constructor(private authService: MsalService, private http : HttpClient) { }

  ngOnInit() {
    this.isIframe = window !== window.parent && !window.opener;
  }

  ret_data : Object;

  login() {
    this.authService.loginPopup()
      .subscribe({
        next: (result) => {
          console.log(result);
          this.setLoginDisplay();

          let headers = new HttpHeaders({
            'Authorization': "Bearer " + result.accessToken,
            'Content-Type': 'application/json'});
          this.http.get("https://graph.microsoft.com/v1.0/auditLogs/signIns?&$filter=startsWith(userPrincipalName,'<INSERT USERID>')", { headers: headers }).subscribe(data => {
            this.ret_data = data;
            console.log(data);
            var i
            var x = ''
            for (i in data['value']) {
                x += "<p>" + i + "<span class=\"nums\">" + JSON.stringify(data['value'][i]) + "</span>" + "</p>"
            }
            document.getElementById('demo').innerHTML = x
          });
        },
        error: (error) => console.log(error)
      });
  }

  setLoginDisplay() {
    this.loginDisplay = this.authService.instance.getAllAccounts().length > 0;
  }
}