import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { productType } from 'src/app/Models/product.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  @Input()
  public label  ;
  @Input()
  public link  ;
  @Input()
  public unit  ;
  @Input()
  public unitPrice  ;
  @Input()
  public quantity ;
  @Input()
  public index;


  @Output()
    selectedOrder = new EventEmitter<String>();

  constructor() { }

  ngOnInit(): void {
  }

  public confirm(){
    Swal.fire({
      title: 'Are you sure?',
      text: "You are about to remove an order .",
      html : ` 
      <h4 class="text-warning" >You are about to remove an order !</h4>
      <hr>
      <div class="row container" >
      <div class="ml-1 col-md" >
          <img height="70" width="70" title="${this.label}" src=${this.link}
          onerror="this.src='../../../assets/imgs/not-found/no-product.png';"
          >
      </div>
      <div class="mx-auto col-md-3">
          <p>${this.label}</p>
      </div>
      <div class="mx-auto col-md-3">
          <p>
              Quantity : <span>${this.quantity}</span>  <span>${this.unit}</span>
          </p>
      </div>
      <div class="mx-auto  col-md">
 
          <p>
              Price : <span>${this.unitPrice}</span> <span>DT</span>
          </p>
      </div>
    
    
  </div>

  <hr>` ,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes , remove order'
    }).then((result) => {
      if (result.isConfirmed) {
            this.selectedOrder.emit(this.index);
          }
        ;
      }
    )
  }


}
