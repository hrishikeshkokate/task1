import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor() { }

  public addUser(user: { email: string, password: string }) {
    const users = this.getUsers();
    users.push(user);
    this.saveUsers(users);
  }

  public validateUser(email: string, password: string): boolean {
    const users = this.getUsers();
    return users.some(user => user.email === email && user.password === password);
  }

  private getUsers(): { email: string, password: string }[] {
    const usersString = localStorage.getItem('users');
    return usersString ? JSON.parse(usersString) : [];
  }

  private saveUsers(users: { email: string, password: string }[]) {
    localStorage.setItem('users', JSON.stringify(users));
  }
}
