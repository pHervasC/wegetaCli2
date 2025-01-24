import { HttpHeaders } from "@angular/common/http";

export const serverURL: string = 'http://localhost:8086';

export const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
    }),
  };