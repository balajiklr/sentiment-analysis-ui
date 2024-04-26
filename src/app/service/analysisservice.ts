import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Analysis } from '../api/analysis';

@Injectable()
export class AnalysisService {

    constructor(private http: HttpClient) { }


    getData() {
        return this.http.get<any>('assets/demo/data/analysis.json')
            .toPromise()
            .then(res => res.data as Analysis[])
            .then(data => data);
    }
}
