import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators,AbstractControl } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  totaldata: any;
  name: any;
  dob: any;
  email: any;
  mobiles: any;
  addresses: any;
  gender: any;
  hobbiesa: any;
  hobbiesb: any;
  hobbiesc: any;

  constructor(
    private formbuilder: FormBuilder,
    private service: UserService,
    private router: Router
  ) { }
  

  ngOnInit() {
    this.getList();
  }

  getList(){
    console.log();
    
    this.service.currentMessage.subscribe(data => {
      console.log('sdfsfsf', data);
      
      this.totaldata = JSON.parse(data);
      console.log('totaldata........',this.totaldata);
      // this.name = this.totaldata.name,
      // this.dob = this.totaldata.dob
      // this.email = this.totaldata.email
      // this.mobiles = this.totaldata.mobiles
      // this.addresses = this.totaldata.addresses
      // this.gender = this.totaldata.gender
      // this.hobbiesa = this.totaldata.this.hobbiesa
      // this.hobbiesb = this.totaldata.this.hobbiesb
      // this.hobbiesc = this.totaldata.this.hobbiesc
    });
  }





  onClickEdit(email){
    console.log('email log', email);
    this.router.navigate(['/edit', email]);    
  }


  onClickview(email){
    console.log('email log', email);
    this.router.navigate(['/view', email]);    
  }
}
