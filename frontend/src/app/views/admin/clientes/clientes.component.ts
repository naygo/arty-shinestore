import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/interfaces/User';
import { UserService } from 'src/app/shared/services/user.service';
import {MatTableDataSource} from '@angular/material/table';
import { DialogService } from 'primeng/dynamicdialog';
import { DelClienteComponent } from './del-cliente/del-cliente.component';
import { MessageService } from 'primeng/api';
import { finalize } from 'rxjs/operators';

export interface Clientes {
  name: string;
  email: string;
}

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit{

  clientes: any[] = [];
  dataSource;
  displayedColumns: string[] = ['name', 'email', 'actions'];

  acoes = [
    { labe: 'editar', value: 'pi pi-editar' },
    { labe: 'excluir', value: 'pi pi-editar' }
  ]

  constructor(
    private userService: UserService,
    public dialogService: DialogService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.loadClientes();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  loadClientes() {
    this. clientes = [];

    this.userService.getAllUsers().subscribe(response => {
      this.clientes = this.clientes.concat(response)
      this.dataSource = new MatTableDataSource(this.clientes);
    })
  }

  delCliente(element) {
    const ref = this.dialogService.open(DelClienteComponent, {
      data: element,
      header: 'Deseja deletar esse cliente?',
      width: '50%'
    });

    ref.onClose.subscribe(resp => {
      if (resp) {
        this.userService.delCategory(resp)
        .pipe(finalize(() => {
          this.loadClientes();
        }))
        .subscribe(() => {
          this.messageService.add({ severity: 'success', summary: 'Sucesso!', detail: 'Usuário deletado com sucesso' });
        }, err => {
          this.messageService.add({ severity: 'error', summary: 'Erro!', detail: 'Não foi possível concluir a operação' });
        });
      }
    });
  }
}
