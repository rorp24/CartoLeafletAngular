import { Component, OnInit } from '@angular/core';
import {FirebaseService} from '../services/firebase.service'


@Component({
  selector: 'app-loged-bar',
  templateUrl: './loged-bar.component.html',
  styleUrls: ['./loged-bar.component.scss']
})
export class LogedBarComponent implements OnInit {
  login:string
  password:string

  constructor(private fb:FirebaseService) { }

  ngOnInit() {
  }

  Login(){
    var emailFormat = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/i)
    if(emailFormat.test(this.login) && this.password.length >1)
    {
      this.fb.logIntoFirebase(this.login,this.password).then((value)=>{
          console.log(value)
          console.log(this.fb.getCurrentUser())
        }).catch((error) => {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          console.error("error " + errorCode + ":", errorMessage)
              // ...
          alert(errorMessage)
      });
    }
    else if(!emailFormat.test(this.login))
    {
      alert("entrez un email svp")
    }
    else
    {
      alert("entrez un mot de passe")
    }
    
  }

}
