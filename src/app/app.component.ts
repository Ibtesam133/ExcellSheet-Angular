import { Component } from '@angular/core';
import * as XLSX from 'ts-xlsx';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'excel';

  arrayBuffer:any;
  file:File;
  incomingfile(event) 
    {


    this.file= event.target.files[0]; 
    }
    ListArray=[] ;
   Upload() {
  
        let fileReader = new FileReader();
          fileReader.onload = (e) => {
              this.arrayBuffer = fileReader.result;
              var data = new Uint8Array(this.arrayBuffer);
              var arr = new Array();
              for(var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
              var bstr = arr.join("");
              var workbook = XLSX.read(bstr, {type:"binary"});
              var first_sheet_name = workbook.SheetNames[0];
              var worksheet = workbook.Sheets[first_sheet_name];
              console.log(XLSX.utils.sheet_to_json(worksheet,{raw:true}));
              this.ListArray = XLSX.utils.sheet_to_json(worksheet,{raw:true});
          }
          fileReader.readAsArrayBuffer(this.file);
          console.log("start");
          console.log(this.ListArray);
          console.log("End");

  }


}
