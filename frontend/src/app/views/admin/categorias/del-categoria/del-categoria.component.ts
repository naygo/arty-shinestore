import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CategoryService } from 'src/app/shared/services/category.service';

@Component({
  selector: 'app-del-categoria',
  templateUrl: './del-categoria.component.html',
  styleUrls: ['./del-categoria.component.css']
})
export class DelCategoriaComponent implements OnInit {

  item;

  constructor(
    public ref: DynamicDialogRef,
    private categoryService: CategoryService,
    private config: DynamicDialogConfig,
  ) { }

  ngOnInit(): void {
    this.item = this.config.data;
  }

  cancel() {
    this.ref.close();
  }

  confirm() {
    this.categoryService.delCategory(this.item.id).subscribe(() => {
      this.ref.close();

    }, err => {
      console.log(err);
    })
  }

}
