import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  para: string;
  totaldata: Array<any>;
  viewdata: any[];

  constructor(
    private route: ActivatedRoute,
    // private formbuilder: FormBuilder,
    private service: UserService,
    private router: Router,
    // private route: ActivatedRoute
  ) { 
    this.route.paramMap.subscribe(params => {
      // console.log('paarams', params.get('email'));
      this.para =  params.get('email');     
    });
  }

  ngOnInit() {
    this.getdata();
  }





  getdata(){
    this.service.currentMessage.subscribe(data => {
      this.totaldata = JSON.parse(data);
      console.log('totaldata........',this.totaldata);

      this.viewdata = this.totaldata.filter(item => {
        if(item.email == this.para){
          return item;
        }
      });
      console.log('viewdata........',this.totaldata);     
    });
  }

}
