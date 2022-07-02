import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AuthGuard } from './guards/auth-guard.guard';
import { AuthOpsService } from './services/auth-ops.service';
import { NgxFireAuthManagerService } from './services/ngx-fire-auth.service';
import { AuthEffects } from './store/effects/auth.effects';
import { authReducer } from './store/reducers/auth-reducer.reducer';
import { NGX_FIRE_AUTH_MANAGER_FEATURE_KEY } from './store/selectors/auth.selector';

@NgModule({
  imports: [
    StoreModule.forFeature(NGX_FIRE_AUTH_MANAGER_FEATURE_KEY, {
      auth: authReducer,
    }),
    EffectsModule.forFeature([AuthEffects]),
  ],
  providers: [NgxFireAuthManagerService, AuthOpsService, AuthGuard],
})
export class NgxFireAuthManagerModule {}
