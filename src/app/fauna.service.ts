import { Injectable } from '@angular/core';
import {from} from 'rxjs';
import * as faunadb from 'faunadb';
const client = new faunadb.Client({ secret: 'fnAEDASOlDACBTTXTsvM3149Yb8Fa_bFlwXClIGu' });

const {
  Ref,
  Paginate,
  Get,
  Match,
  Select,
  Index,
  Create,
  Collection,
  Join,
  Call,
  Function: Fn,
} = faunadb.query;

@Injectable({
  providedIn: 'root'
})
export class FaunaService {

  constructor() { }

  getBurndownValues() {
    return from(client.query(Get(Ref(Collection('sprints'), '291579541602697729'))));
  }


}
