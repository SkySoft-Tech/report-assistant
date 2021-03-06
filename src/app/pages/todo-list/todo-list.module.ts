import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TodoListRoutingModule } from './todo-list-routing.module';
import { TodoListComponent } from './todo-list.component';
import { TodoListService } from './todo-list.service';

@NgModule({
  imports: [
    CommonModule,
    TodoListRoutingModule
  ],
  providers: [
    TodoListService
  ],
  declarations: [TodoListComponent]
})
export class TodoListModule { }
