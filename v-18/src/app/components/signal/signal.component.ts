import { Component, NgZone, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';

/**
 * SignalComponent
 *
 * @description
 *  - formGroupを定義
 *  - formGroupに含まれるFormControlのvalueChangesをsubscribeし、signalプロパティに値を設定
 *  - formGroupをtemplateに渡す
 *  - templateでは、formGroupを使用してフォームを生成
 *  - signalプロパティをtemplateに表示
 */
@Component({
  selector: 'app-signal',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './signal.component.html',
  styleUrl: './signal.component.scss'
})
export class SignalComponent implements OnDestroy {

  myForm = new FormGroup({
    name: new FormControl('')
  });

  /**
   * signal
   *
   * @description
   *  - formGroupに含まれるFormControlのvalueChangesをsubscribeし、値を設定
   */
  signal = '';

  /**
   * Subscription
   *
   * @description
   *  - formGroupに含まれるFormControlのvalueChangesをsubscribe
   */
  subscription: Subscription;

  // Zonelessを用いた実装>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  constructor() {
    /**
     * formGroupに含まれるFormControlのvalueChangesをsubscribe
     */
    this.subscription = this.myForm.get('name')!.valueChanges.subscribe(value => {
      /**
       * signalプロパティに値を設定
       */
      this.signal = `${value}`;
    });
  }
  // -----------------------------------------------------------------------------
  //   /**
  //    * constructor
  //    *
  //    * @description
  //    *  - formGroupに含まれるFormControlのvalueChangesをsubscribe
  //    *  - NgZoneを使用して、Zone内でsignalプロパティに値を設定
  //    * @param ngZone NgZone
  //    */
  //   constructor(private ngZone: NgZone) {
  //   /**
  //    * formGroupに含まれるFormControlのvalueChangesをsubscribe
  //    */
  //   this.subscription = this.myForm.get('name')!.valueChanges.subscribe(value => {
  //     /**
  //      * NgZoneを使用して、Zone内でsignalプロパティに値を設定
  //      */
  //     this.ngZone.run(() => {
  //       this.signal = `${value}`;
  //     });
  //   });
  // }
  // Zone.jsを用いた実装<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< <

  /**
   * ngOnDestroy
   *
   * @description
   *  - Subscriptionをunsubscribe
   */
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
