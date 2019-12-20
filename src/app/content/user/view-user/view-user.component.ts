import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {User} from '../../../model/user';
import {UserService} from '../../../services/user.service';
import { MatSnackBarConfig, MatSort, Sort} from '@angular/material';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.scss']
})
export class ViewUserComponent implements OnInit {
  displayedColumns: string[] = ['userName', 'userRole'];
  private USER_DATA: User[];
  sortedData: User[];
  pageSize: number;
  dataSource = new MatTableDataSource<User>();
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  private snackBar: any;

  constructor(public userService: UserService) {
  }

  ngOnInit() {
    this.pageSize = 5;
    this.findUsers();
  }

  findUsers() {
    this.userService.getAllUsers().subscribe(
      data => {
        this.USER_DATA = data;
        this.dataSource.data = this.USER_DATA;
        this.refreshTableAttribute();
      },
      error => {

      }
    );
  }

  refreshTableAttribute() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.filterPredicate = (data: User, filter: string) => {
      return (
        this.filterData(data.name, filter) ||
        this.filterData(data.role, filter));
    };
    this.dataSource.sort = this.sort;
  }
  filterData(data: any, filter: string) {
    if (!(data === (null || undefined))) {
      return data.toString().toLowerCase().includes(filter);
    }
  }
  sortData(sort: Sort) {
    const data = this.USER_DATA.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      this.dataSource.data = this.sortedData;
      // tslint:disable-next-line:no-shadowed-variable only-arrow-functions
      this.dataSource.filterPredicate = function(data, filter: string): boolean {
        return data.name.toLowerCase().includes(filter) ||
          data.role.toLowerCase().includes(filter) ;
      };
      return;
    }
    this.dataSource = new MatTableDataSource(data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'name': return compare(a.name, b.name, isAsc);
        case 'role': return compare(a.role, b.role, isAsc);
        default: return 0;
      }
    }));

    this.dataSource.paginator = this.paginator;
  }
  openSnackbar(message) {
    const config = new MatSnackBarConfig();
    config.duration = 10000;
    config.horizontalPosition = 'end';
    config.verticalPosition = 'top';
    this.snackBar.open(message, 'OK', config);
  }
  applyFilter(filterValue: string) {
    console.log(filterValue);
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.refreshTableAttribute();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
