import { Action } from "@ngrx/store";

export const ACTIVATE_LOADING = '[UI Loadind]  Cargando...';
export const DEACTIVATE_LOADING = '[UI Loadind]  Fin...';


export class ActivateLoadingAction implements Action {
  readonly type = ACTIVATE_LOADING;
}

export class DeactivateLoadingAction implements Action {
  readonly type = DEACTIVATE_LOADING;
}

export type acciones = ActivateLoadingAction |
DeactivateLoadingAction;
