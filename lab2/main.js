import model from './model/model.js';
import controller from './controller/controller.js';
import view from './view/view.js';

let Model = new model();
let View = new view();
let Controller = new controller(View, Model);